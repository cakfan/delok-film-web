"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { countryFlag } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export type ClientColumn = {
  id: string;
  title: string;
  slug: string;
  poster: string;
  updatedAt: string;
  country: string;
  type: string;
  status: string;
};

export const Columns: ColumnDef<ClientColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <div className="w-20 rounded-full bg-accent">
          <AspectRatio ratio={1 / 1}>
            <Image
              src={row.original.poster}
              alt={row.original.title}
              fill
              className="rounded-full object-cover"
            />
          </AspectRatio>
        </div>
        <span className="text-lg font-bold">{row.original.title}</span>
        <Link
          href={`/p/${row.original.slug}`}
          title={"View: " + row.original.title}
          target="_blank"
          className={cn(buttonVariants({ variant: "link" }), "flex gap-2")}
        >
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={row.original.status === "public" ? "secondary" : "destructive"}
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated at",
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {countryFlag(row.original.country)}
        <span className="text-sm">{row.original.country}</span>
      </div>
    ),
  },
  {
    accessorKey: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
