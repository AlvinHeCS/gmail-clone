
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import LoginButton from "./_components/loginButton";
import { SessionProvider } from "next-auth/react";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <SessionProvider>
      <HydrateClient>
        <div>
          Hello
          <LoginButton />
        </div>
      </HydrateClient>
    </SessionProvider>
  );
}
