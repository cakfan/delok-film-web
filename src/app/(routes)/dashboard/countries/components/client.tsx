"use client";

import { Columns, ClientColumn } from "./columns";
import { Heading } from "@/components/ui/heading";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface CountryProps {
  data: ClientColumn[];
}

const CountryClient: React.FC<CountryProps> = ({ data }) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  });

  return (
    <div className="flex flex-col gap-4 p-10">
      <div className="flex items-center justify-between">
        <Heading
          title={`Countries (${data.length})`}
          description="Manage countries for your website"
        />
        <Link
          href={`/editor?type=country&id=new`}
          className={cn(buttonVariants(), "rounded-full")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Link>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={Columns} data={data} />
    </div>
  );
};

export default CountryClient;
