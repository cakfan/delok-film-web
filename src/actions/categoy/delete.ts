"use server";

import prismadb from "@/config/prisma";
import { getPermission } from "./permission";

export const deleteCategory = async (id: string) => {
  try {
    const isAllowed = await getPermission(["admin"]);

    if (!isAllowed) {
      return {
        status: "denied",
        message: "You don't have permission",
      };
    }
    const deleted = await prismadb.category.delete({
      where: { id },
    });
    return {
      status: "success",
      message: "Category deleted",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};
