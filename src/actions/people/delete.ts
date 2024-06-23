"use server";

import prismadb from "@/config/prisma";
import { getPermission } from "./permission";

export const deletePeople = async (id: string) => {
  try {
    const isAllowed = await getPermission(["admin"]);

    if (!isAllowed) {
      return {
        status: "denied",
        message: "You don't have permission",
      };
    }
    const deleted = await prismadb.people.delete({
      where: { id },
    });
    return {
      status: "success",
      message: "People deleted",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};
