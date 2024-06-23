import prismadb from "@/config/prisma";
import { People } from "@prisma/client";

export const getAllPeoples = async (): Promise<People[] | null> => {
  const peoples = await prismadb.people.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });

  return peoples;
};
