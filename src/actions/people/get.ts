import prismadb from "@/config/prisma";
import { PeopleWithAuthors } from "@/types/post/people";
import { People, User } from "@prisma/client";
import { toast } from "sonner";

export const getPeople = async ({
  id,
  slug,
}: {
  id?: string;
  slug?: string;
}): Promise<PeopleWithAuthors | null> => {
  if (!id && !slug) {
    const msg = "You have to provide an id or slug";
    toast.error(msg);
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
