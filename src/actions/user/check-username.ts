import prismadb from "@/config/prisma";

export const checkUsername = async (username: string): Promise<boolean> => {
  const user = await prismadb.user.findUnique({
    where: {
      username,
    },
  });

  return user ? true : false;
};
