import { auth, signOut } from "@/config/auth";
import { getInitialName, getUser } from "@/actions/user";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

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
  const isUsername = username.includes("%40");
  const user = await getUser(username.replaceAll("%40", ""));
  if (!user) notFound();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center space-y-4 py-4">
      {/* <Avatar className="h-24 w-24">
        <AvatarImage src={user?.image ?? "na"} />
        <AvatarFallback>
          {getInitialName(user?.name ?? "Profile")}
        </AvatarFallback>
      </Avatar> */}
      <h1 className="text-balance text-3xl font-bold">{user?.name ?? "NA"}</h1>
      {session && (
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
  );
}
