"use server";

import prismadb from "@/config/prisma";
import { PeopleWithAuthors } from "@/types/post/people";

export const getAllPeoples = async (): Promise<PeopleWithAuthors[] | null> => {
  const peoples = await prismadb.people.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      authors: true,
      nationality: true,
    },
  });

  return peoples;
};
