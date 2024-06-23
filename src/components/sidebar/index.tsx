import React from "react";
import SidebarBrand from "./brand";
import SidebarMenu from "./menu";
import { cn } from "@/lib/utils";

const SidebarWrapper = ({
  children,
  isDashboard = false,
  isSmall = false,
}: Readonly<{
  children: React.ReactNode;
  isDashboard?: boolean;
  isSmall?: boolean;
}>) => {
  return (
    <div className="z-50 flex w-full font-sans">
      <aside
        className={cn(
          "border-neutral sticky top-0 hidden h-screen w-fit items-center border-r md:flex md:px-4 lg:w-64 lg:py-6",
          isSmall && "lg:w-fit",
        )}
      >
        <div className="flex h-full w-full flex-col">
          <SidebarBrand isSmall={isSmall} />
          <SidebarMenu isDashboard={isDashboard} isSmall={isSmall} />
        </div>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default SidebarWrapper;
