"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { countryFlag } from "@/components/icons";

export type ClientColumn = {
  id: string;
  slug: string;
  name: string;
};

export const Columns: ColumnDef<ClientColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "Flag",
    cell: ({ row }) => countryFlag(row.original.name),
  },
  {
    accessorKey: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
