"use client";

import { Columns, ClientColumn } from "./columns";
import { Heading } from "@/components/ui/heading";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Film, Tv2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface PostProps {
  data: ClientColumn[];
}

const PostClient: React.FC<PostProps> = ({ data }) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  });

  return (
    <div className="flex flex-col gap-4 p-10">
      <div className="flex items-center justify-between">
        <Heading
          title={`Posts (${data.length})`}
          description="Manage posts for your website"
        />
        <div className="flex gap-4">
          <Link
            href={`/editor?type=drama&id=new`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-full",
            )}
          >
            <Tv2 className="mr-2 h-4 w-4" />
            Add Drama
          </Link>
          <Link
            href={`/editor?type=movie&id=new`}
            className={cn(buttonVariants(), "rounded-full")}
          >
            <Film className="mr-2 h-4 w-4" />
            Add Movie
          </Link>
        </div>
      </div>
      <Separator />
      <DataTable searchKey="title" columns={Columns} data={data} />
    </div>
  );
};

export default PostClient;
