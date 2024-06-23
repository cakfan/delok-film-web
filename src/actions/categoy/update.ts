"use server";

import prismadb from "@/config/prisma";
import { CategoryFormValues } from "@/types/post/category";
import { getPermission } from "./permission";

export const updateCategory = async (data: CategoryFormValues) => {
  try {
    const isAllowed = await getPermission(["admin", "contributor"]);

    if (!isAllowed) {
      return {
        status: "denied",
        message: "You don't have permission",
      };
    }

    const updated = await prismadb.category.update({
      where: { id: data.id },
      data,
    });
    return {
      status: "success",
      message: "Category updated",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};
