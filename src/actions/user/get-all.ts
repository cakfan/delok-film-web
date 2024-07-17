"use server";

import prismadb from "@/config/prisma";
import { User } from "@prisma/client";

export const getAllUsers = async (): Promise<User[] | null> => {
  try {
    const users = await prismadb.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return users;
  } catch (error) {
    return null;
  }
};
