"use client";

import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ClientColumn } from "./columns";

import { Button, buttonVariants } from "@/components/ui/button";
import { AlertModal } from "@/components/alert";
import Link from "next/link";
import { deletePeople } from "@/actions/people";
import { cn } from "@/lib/utils";

interface CellActionProps {
  data: ClientColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const response = await deletePeople(data.id);
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />

      <div className="flex">
        <Button
          className="rounded-full text-destructive hover:text-destructive"
          onClick={() => setOpen(true)}
          variant="ghost"
          size="icon"
          title="Delete"
        >
          <Trash className="h-4 w-4" />
        </Button>
        <Link
          href={`/editor?type=people&id=${data.id}`}
          className={cn(buttonVariants({ variant: "link", size: "icon" }))}
          title="Edit Post"
        >
          <Edit className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
};
