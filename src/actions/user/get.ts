import prismadb from "@/config/prisma";
import { User } from "@prisma/client";

export const getUser = async (username: string): Promise<User | null> => {
  const user = await prismadb.user.findUnique({
    where: {
      username,
    },
  });

  return user;
};
