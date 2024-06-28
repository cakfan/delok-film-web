"use client";

import { Columns, ClientColumn } from "./columns";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface UsersProps {
  data: ClientColumn[];
}

const UserClient: React.FC<UsersProps> = ({ data }) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  });

  return (
    <div className="flex flex-col gap-4 px-10 py-5">
      <div className="sticky top-0 z-10 flex items-center justify-between bg-background py-5">
        <Heading
          title={`Users (${data.length})`}
          description="Manage users for your website"
        />
      </div>
      <Separator />
      <DataTable searchKey="name" columns={Columns} data={data} />
    </div>
  );
};

export default UserClient;
