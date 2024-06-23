import MobileNavWrapper from "@/components/mobile";
import SidebarWrapper from "@/components/sidebar";

export default async function Template({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarWrapper isSmall>
      {children}
      <MobileNavWrapper />
    </SidebarWrapper>
  );
}
