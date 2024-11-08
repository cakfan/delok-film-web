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

export type ClientColumn = {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
  value: number;
  content: string;
  slug: string;
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
      </div>
    ),
  },
  {
    header: " ",
    cell: ({ row }) => (
      <Link
        href={`/p/${row.original.slug}#${row.original.id}`}
        title={row.original.content}
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
    accessorKey: "value",
    header: "Star",
    cell: ({ row }) => (
      <div className="m-1 flex h-fit items-center">
        <span className="line-clamp-1 w-fit text-xs font-bold">
          {row.original.value}
        </span>
        <BrandIcons.star />
      </div>
    ),
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => (
      <div
        className="content prose text-balance dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: row.original.content }}
      />
    ),
  },
  {
    accessorKey: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
