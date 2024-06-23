import { isAdmin } from "@/actions/user/is-admin";
import { redirect } from "next/navigation";

export default async function Template({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isUserAdmin = await isAdmin();
  if (!isUserAdmin) redirect("/");
  return <>{children}</>;
}
