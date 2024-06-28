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

interface PeopleProps {
  data: ClientColumn[];
}

const PeopleClient: React.FC<PeopleProps> = ({ data }) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  });

  return (
    <div className="flex flex-col gap-4 px-10 py-5">
      <div className="sticky top-0 z-10 flex items-center justify-between bg-background py-5">
        <Heading
          title={`Peoples (${data.length})`}
          description="Manage peoples for your website"
        />
        <Link
          href={`/editor?type=people&id=new`}
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

export default PeopleClient;
