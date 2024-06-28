import { getMe } from "@/actions/user";
import MobileNavWrapper from "@/components/mobile";
import SidebarWrapper from "@/components/sidebar";
import { redirect } from "next/navigation";

export default async function Template({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const me = await getMe();
  if (!me || me.role === "member") redirect("/");
  return (
    <SidebarWrapper isDashboard>
      {children}
      <MobileNavWrapper />
    </SidebarWrapper>
  );
}
