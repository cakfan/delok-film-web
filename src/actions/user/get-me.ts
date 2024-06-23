import { auth } from "@/config/auth";
import prismadb from "@/config/prisma";
import { User } from "@prisma/client";

export const getMe = async (): Promise<User | null> => {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    return null;
  }

  const me = await prismadb.user.findUnique({
    where: {
      id: session.user?.id,
    },
  });

  return me;
};
