"use server";

import prismadb from "@/config/prisma";
import { getPermission } from "./permission";
import { getDrama } from "./get";

export const deleteDrama = async (id: string) => {
  try {
    const isAllowed = await getPermission(["admin"]);

    if (!isAllowed) {
      return {
        status: "denied",
        message: "You don't have permission",
      };
    }

    const checkDrama = await getDrama({ id });

    if (!checkDrama) {
      return {
        status: "notFound",
        message: "Drama not found",
      };
    }

    const deleted = await prismadb.post.delete({
      where: { id },
    });
    return {
      status: "success",
      message: "Drama deleted",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};
