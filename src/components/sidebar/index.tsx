import React, { Suspense } from "react";
import SidebarBrand from "./brand";
import SidebarMenu from "./menu";
import { cn } from "@/lib/utils";
import SidebarSkeleton from "./skeleton";

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
          <Suspense fallback={<SidebarSkeleton />}>
            <SidebarMenu isDashboard={isDashboard} isSmall={isSmall} />
          </Suspense>
        </div>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default SidebarWrapper;
