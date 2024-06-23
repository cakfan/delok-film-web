import { isSetup } from "@/actions/user";
import MobileNavWrapper from "@/components/mobile";
import SidebarWrapper from "@/components/sidebar";

export default async function Template({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await isSetup({});
  return (
    <SidebarWrapper>
      {children}
      <MobileNavWrapper />
    </SidebarWrapper>
  );
}
