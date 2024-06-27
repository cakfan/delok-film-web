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

interface ReviewProps {
  data: ClientColumn[];
}

const ReviewClient: React.FC<ReviewProps> = ({ data }) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  });

  return (
    <div className="flex flex-col gap-4 p-10">
      <div className="flex items-center justify-between">
        <Heading
          title={`Reviews (${data.length})`}
          description="Manage reviews for your website"
        />
      </div>
      <Separator />
      <DataTable searchKey="name" columns={Columns} data={data} />
    </div>
  );
};

export default ReviewClient;
