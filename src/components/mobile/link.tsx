"use client";

import { usePathname } from "next/navigation";
import { SidebarNavItem } from "@/types/nav";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const MobileLink = ({ item }: { item: SidebarNavItem }) => {
  const pathname = usePathname();
  const isCurrent = pathname === item.href;
  if (item.href) {
    return (
      <Link
        href={item.href}
        className={cn("flex-1 flex-grow", isCurrent && "text-primary")}
      >
        <div className="mx-auto h-5 w-5">
          {item.isProfile ? (
            <Image
              className="rounded-full"
              width={20}
              height={20}
              objectFit="cover"
              src={item.icon as string}
              alt={item.title}
            />
          ) : (
            <>{item.icon}</>
          )}
        </div>
      </Link>
    );
  }
};

export default MobileLink;
