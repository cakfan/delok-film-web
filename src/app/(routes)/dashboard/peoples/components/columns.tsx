"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { countryFlag } from "@/components/icons";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

export type ClientColumn = {
  id: string;
  name: string;
  avatar: string;
  birthDate: string;
  nationality: string;
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
    accessorKey: "birthDate",
    header: "Birth Date",
  },
  {
    accessorKey: "nationality",
    header: "Nationality",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {countryFlag(row.original.nationality)}
        <span className="text-sm">{row.original.nationality}</span>
      </div>
    ),
  },
  {
    accessorKey: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
