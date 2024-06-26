import { auth, signOut } from "@/config/auth";
import { getInitialName, getUser } from "@/actions/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { Suspense } from "react";
import PostSkeleton from "@/components/card/skeleton";
import AuthorPost from "./post";

interface UsernameProps {
  params: { username: string };
}

export async function generateMetadata({
  params: { username },
}: UsernameProps) {
  const user = await getUser(username.replaceAll("%40", ""));
  return {
    title: user ? `${user?.name} (@${user?.username})` : "User not found",
  };
}

export default async function UsernamePage({
  params: { username },
}: UsernameProps) {
  const session = await auth();
  const user = await getUser(username.replaceAll("%40", ""));
  if (!user || !user.username) notFound();
  const isMe = session?.user.id === user.id;

  return (
    <div className="flex w-full flex-col justify-between gap-4 p-10 lg:px-20">
      <div className="flex w-full items-center justify-start">
        <div className="flex flex-1 items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user?.image ?? "na"} />
            <AvatarFallback>
              {getInitialName(user?.name ?? "Profile")}
            </AvatarFallback>
          </Avatar>
          <div className="prose flex flex-col dark:prose-invert">
            <h1 className="mb-4 text-balance">{user?.name ?? "NA"}</h1>
            <p className="m-0">
              Since {format(user.createdAt, "PPP", { locale: enUS })}
            </p>
          </div>
        </div>
        <div className="flex">
          {session && isMe && (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button variant="destructive" type="submit">
                Sign Out
              </Button>
            </form>
          )}
        </div>
      </div>
      <div className="w-full">
        <Suspense fallback={<PostSkeleton total={6} />}>
          <AuthorPost username={user.username} />
        </Suspense>
      </div>
    </div>
  );
}
