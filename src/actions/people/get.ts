import prismadb from "@/config/prisma";
import { PeopleWithAuthors } from "@/types/post/people";

export const getPeople = async ({
  id,
  slug,
}: {
  id?: string;
  slug?: string;
}): Promise<PeopleWithAuthors | null> => {
  if (!id && !slug) {
    return null;
  }

  const people = await prismadb.people.findFirst({
    where: {
      OR: [{ id }, { slug }],
    },
    include: {
      authors: true,
      nationality: true,
    },
  });

  return people;
};
