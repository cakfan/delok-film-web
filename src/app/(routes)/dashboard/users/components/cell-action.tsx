"use client";

import { Copy, MoreHorizontalIcon, Trash } from "lucide-react";
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
import { deleteReview } from "@/actions/review";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { changeUserRole } from "@/actions/user";

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
      const response = await deleteReview(data.id);
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

  const changeRole = async (role: string) => {
    try {
      const response = await changeUserRole(data.id, role);
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
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
      <Select
        onValueChange={changeRole}
        defaultValue={data.role}
        disabled={data.isMe}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={"User role"} defaultChecked />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Change Role</SelectLabel>
            <SelectItem value="member">Member</SelectItem>
            <SelectItem value="contributor">Contributor</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
