import { z } from "zod";
import { getGmailClient } from "~/server/lib/gmail";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "~/server/lib/amazon";
import { Readable } from "stream";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

type EmailMeta = {
  subject: string | null;
  fromName: string | null;
};

async function uploadMessageToS3(messageId: string, rawMessage: string) {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: messageId, 
        Body: Buffer.from(rawMessage, "base64"), 
        ContentType: "message/rfc822",
    };

    await s3.send(new PutObjectCommand(params));
}

export function extractEmailMetaFromRawHtml(rawHtml: string): EmailMeta {
  const text = rawHtml.replace(/\r\n/g, "\n");
  const subjectMatch = text.match(/^Subject:\s*(.+)$/im);
  const subject = subjectMatch?.[1]?.trim() ?? null;
  const fromMatch = text.match(/^From:\s*(.+)$/im);
  let fromName: string | null = null;
  if (fromMatch?.[1]) {
    const fromValue = fromMatch[1].trim();
    const nameMatch = fromValue.match(/^(.*?)(?:\s*<.+>)$/);
    if (nameMatch?.[1]) {
      fromName = nameMatch[1].replace(/"/g, "").trim();
    }
  }
  return {
    subject,
    fromName,
  };
}

async function getObjectFromS3(key: string): Promise<string> {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!, 
        Key: key,
    });

    const response = await s3.send(command);
    const stream = response.Body as Readable;
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk));
    }
    return Buffer.concat(chunks).toString("utf-8");
}

export const gmailRouter = createTRPCRouter({
    initialSync: protectedProcedure
    .mutation(async({ ctx }) => {
        const userId = ctx.session.user.id;
        const googleAccount = await ctx.db.account.findFirst({
            where: {userId: userId, provider: "google"}
        })
        if (!googleAccount) throw new Error("googleAccount not found");
        if (!googleAccount.refresh_token) throw new Error("refresh Token not found");
        
        // allow you to make gmail api request using the accounts refresh token
        const gmail = getGmailClient(googleAccount.refresh_token);
        const threadRunId = crypto.randomUUID();
        const res = await gmail.users.threads.list({
            userId: "me",
            maxResults: 50,
        })
        
        // 
        const threadIdsAndSnippet = res.data.threads
        if (!threadIdsAndSnippet) throw new Error("no threads returned from list")
        

        await Promise.all(
            threadIdsAndSnippet.map(async (thread) => {
                if (!thread.id) throw new Error("thread has no id")

                const { data: wholeThread } = await gmail.users.threads.get({
                    userId: "me",
                    id: thread.id,
                })

                const threadId = wholeThread.id
                const messages = wholeThread.messages
                const historyId = wholeThread.historyId
                if (!threadId || !messages || !historyId) {
                    throw new Error("Invalid thread data")
                }

                await ctx.db.thread.upsert({
                    where: { id: threadId },
                    update: {
                    runId: threadRunId,
                    historyId,
                    snippet: wholeThread.snippet ?? "",
                    },
                    create: {
                    id: threadId,
                    userId,
                    runId: threadRunId,
                    historyId,
                    snippet: wholeThread.snippet ?? "",
                    displayName: "temp",
                    subjectLine: "temp",
                    },
                })
                
                const msgRunId = crypto.randomUUID()
                const newMsgsData = await Promise.all(
                    messages.map(async (message, i) => {
                        if (!message.id) throw Error ("message has no id")
                        const {data: fullMsg } = await gmail.users.messages.get({userId: "me", id: message.id, format: "raw"})
                        if (!fullMsg.id) throw new Error("FullMessage id missing")
                        if (i===0) {
                            const {fromName: displayName, subject: subjectLine} = extractEmailMetaFromRawHtml(fullMsg.raw || "")
                            console.log("this is displayName: ", displayName);
                            console.log("this is subjectLine: ", subjectLine);
                            await ctx.db.thread.update({
                                where: {id: threadId},
                                data: {
                                    displayName: displayName || "",
                                    subjectLine: subjectLine || ""
                                }
                            })
                        }
                        await uploadMessageToS3(fullMsg.id, fullMsg.raw ?? "")
                        return {
                            id: fullMsg.id,
                            labelIds: fullMsg.labelIds!,
                            snippet: fullMsg.snippet ?? "",
                            historyId: fullMsg.historyId!,
                            internalDate: fullMsg.internalDate!,
                            sizeEstimate: fullMsg.sizeEstimate!,
                            runId: msgRunId,
                        }
                    })
                )

                await Promise.all(
                    newMsgsData.map(message =>
                    ctx.db.message.upsert({
                        where: { id: message.id },
                        update: message,
                        create: {
                        ...message,
                        threadId,
                        },
                    })
                    )
                )
            })
        )
    }),
    getThreads: protectedProcedure
    .query(async ({ctx}) => {
        return await ctx.db.thread.findMany({
            where: {userId: ctx.session.user.id},
            include: {
            messages: {
                orderBy: { internalDate: "asc" },
                take: 1,
            },
            },
        })
    }),
    getHashMapMessages: protectedProcedure
    .input(z.object({ threadId: z.string() }))
    .query(async ({ ctx, input }) => {
        const messages = await ctx.db.message.findMany({
            where: { threadId: input.threadId },
        });
        const messageHashMap: Record<string, string> = {}
        await Promise.all(
            messages.map(async (message) => {
                messageHashMap[message.id] = await getObjectFromS3(message.id)
            })
        );

        return messageHashMap
    })
})