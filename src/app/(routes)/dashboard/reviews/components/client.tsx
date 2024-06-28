"use client";

import { Columns, ClientColumn } from "./columns";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ReviewProps {
  data: ClientColumn[];
}

const ReviewClient: React.FC<ReviewProps> = ({ data }) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  });

  return (
    <div className="flex flex-col gap-4 px-10 py-5">
      <div className="sticky top-0 z-10 flex items-center justify-between bg-background py-5">
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
