"use client"

import type { Thread } from "generated/prisma"
import { useEffect } from "react"
import { api } from "~/trpc/react"

interface prop {
    thread: Thread
}

export default function OpenedThread(openedThreadProp: prop) {
    
    const {data: messageHashMap, isLoading: loadingMessages } = api.gmail.getHashMapMessages.useQuery({threadId: openedThreadProp.thread.id})
    useEffect(() => {
        console.log("this is thread: ", openedThreadProp.thread)
    }, [])
    
    if (loadingMessages) return <>Messages are being loaded</>
    if (!messageHashMap) return <>No messages in this thread</>
    return(
        <div>
                {Object.values(messageHashMap).map((messageContent, i) => (
                <div key={i}>{messageContent}</div>
                ))}
        </div>
    )
}