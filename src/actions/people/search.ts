import prismadb from "@/config/prisma";
import { People } from "@prisma/client";

interface PostProps {
  skip?: number;
  take?: number;
  query?: string;
}

export const searchPeople = async ({
  skip = 0,
  take = 10,
  query,
}: PostProps): Promise<People[] | null> => {
  const people = await prismadb.people.findMany({
    skip,
    take,
    where: {
      OR: [
        { name: { contains: query ?? undefined, mode: "insensitive" } },
        { bio: { contains: query ?? undefined, mode: "insensitive" } },
      ],
    },
  });

  return people;
};
