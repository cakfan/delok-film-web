"use client";

import { useEffect } from "react";
import { Plus } from "lucide-react";
import { Columns, ClientColumn } from "./columns";
import { Heading } from "@/components/ui/heading";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface CategoryProps {
  data: ClientColumn[];
}

const CategoryClient: React.FC<CategoryProps> = ({ data }) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  });

  return (
    <div className="flex w-full flex-col gap-4 p-10">
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage categories for your website"
        />
        <Link
          href={`/editor?type=category&id=new`}
          className={cn(buttonVariants(), "rounded-full")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Link>
      </div>
      <DataTable searchKey="name" columns={Columns} data={data} />
    </div>
  );
};

export default CategoryClient;
