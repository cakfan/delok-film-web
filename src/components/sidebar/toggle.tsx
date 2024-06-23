"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { SidebarNavItem } from "@/types/nav";
import { useEffect, useState } from "react";

export function SidebarThemeToggle({
  item,
  isSmall,
}: {
  item: SidebarNavItem;
  isSmall: boolean;
}) {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="sidebar"
          size="sidebar"
          className="flex w-full border-none focus-visible:border-none focus-visible:ring-transparent focus-visible:ring-offset-transparent"
        >
          <div className="text-2xl transition-all duration-100 ease-in-out group-hover:scale-105">
            {isClient ? (
              resolvedTheme === "light" ? (
                <Sun className="h-5 w-5 lg:h-6 lg:w-6" />
              ) : (
                <Moon className="h-5 w-5 lg:h-6 lg:w-6" />
              )
            ) : (
              <>{item.icon}</>
            )}
          </div>
          <span
            className={cn(
              "ml-4 line-clamp-1 hidden flex-1 text-ellipsis text-nowrap text-left capitalize lg:ml-6 lg:mr-4 lg:inline lg:text-base",
              isSmall && "lg:hidden",
            )}
          >
            {isClient ? theme : item.title}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
