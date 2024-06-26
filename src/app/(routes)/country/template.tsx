import MobileNavWrapper from "@/components/mobile";
import SidebarWrapper from "@/components/sidebar";

export default function Template({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarWrapper>
      {children}
      <MobileNavWrapper />
    </SidebarWrapper>
  );
}
