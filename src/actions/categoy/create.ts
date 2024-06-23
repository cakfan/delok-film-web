"use server";

import prismadb from "@/config/prisma";
import { CategoryFormValues } from "@/types/post/category";
import { getPermission } from "./permission";

export const createCategory = async (data: CategoryFormValues) => {
  try {
    const isAllowed = await getPermission(["admin", "contributor"]);

    if (!isAllowed) {
      return {
        status: "error",
        message: "You don't have permission",
      };
    }

    const created = await prismadb.category.create({
      data,
    });
    return {
      status: "success",
      message: "Category created",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};
