"use server";

import prismadb from "@/config/prisma";
import { Roles } from "@prisma/client";

export const changeUserRole = async (userId: string, role: string) => {
  try {
    const user = await prismadb.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return {
        status: "error",
        message: "User not found",
      };
    }

    const update = await prismadb.user.update({
      where: {
        id: userId,
      },
      data: {
        role: role as Roles,
      },
    });

    return {
      status: "success",
      message: "User role successfully changes",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};
