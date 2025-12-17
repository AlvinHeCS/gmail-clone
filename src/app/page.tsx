

import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import LoginButton from "./_components/loginButton";
import { SessionProvider } from "next-auth/react";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <SessionProvider>
      <HydrateClient>
        <div>
          <LoginButton />
        </div>
      </HydrateClient>
    </SessionProvider>
  );
}
