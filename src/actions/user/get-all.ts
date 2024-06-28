import prismadb from "@/config/prisma";
import { User } from "@prisma/client";
import { getMe } from "./get-me";

export const getAllUsers = async (): Promise<User[] | null> => {
  try {
    const me = await getMe();

    if (!me) return null;

    const users = await prismadb.user.findMany({
      where: {
        id: { not: me.id },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return users;
  } catch (error) {
    return null;
  }
};
