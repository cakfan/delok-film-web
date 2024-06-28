"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { BrandIcons } from "@/components/icons";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type ClientColumn = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  createdAt: string;
  role: string;
  isMe: boolean;
};

export const Columns: ColumnDef<ClientColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="h-10 w-10">
          <AspectRatio ratio={1}>
            <Image
              src={row.original.avatar}
              alt={row.original.name}
              fill
              className="rounded-full object-cover"
            />
          </AspectRatio>
        </div>
        <span className="text-sm font-bold">{row.original.name}</span>
        <Badge
          variant="secondary"
          className={cn(
            "items-center justify-center",
            !row.original.isMe && "hidden",
          )}
        >
          me
        </Badge>
      </div>
    ),
  },
  {
    header: " ",
    cell: ({ row }) => (
      <Link
        href={`/@${row.original.username}`}
        title={row.original.name}
        target="_blank"
        className={cn(buttonVariants({ variant: "link" }), "flex gap-2")}
      >
        <ExternalLink className="h-4 w-4" />
        View
      </Link>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
  },
  {
    accessorKey: "role",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
