"use server";

import prismadb from "@/config/prisma";
import { getPermission } from "./permission";
import { getMovie } from "./get";

export const deleteMovie = async (id: string) => {
  try {
    const isAllowed = await getPermission(["admin"]);

    if (!isAllowed) {
      return {
        status: "denied",
        message: "You don't have permission",
      };
    }

    const checkMovie = await getMovie({ id });

    if (!checkMovie) {
      return {
        status: "notFound",
        message: "Movie not found",
      };
    }

    const deleted = await prismadb.post.delete({
      where: { id },
    });
    return {
      status: "success",
      message: "Movie deleted",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};
