"use client";

import { Copy, Edit, MoreHorizontalIcon, Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ClientColumn } from "./columns";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertModal } from "@/components/alert";
import Link from "next/link";
import { deletePeople } from "@/actions/people";

interface CellActionProps {
  data: ClientColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("People id copied to the clipboard");
  };

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={`/editor?type=people&id=${data.id}`} className="flex">
              <Edit className="mr-2 h-4 w-4" />
              Update
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-destructive"
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
