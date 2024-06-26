import prismadb from "@/config/prisma";
import { DramaWithAuthor } from "@/types/post/drama";
import { toast } from "sonner";

export const getDrama = async ({
  id,
  slug,
}: {
  id?: string;
  slug?: string;
}): Promise<DramaWithAuthor | null> => {
  if (!id && !slug) {
    return null;
  }

  const drama = await prismadb.post.findFirst({
    where: {
      type: "drama",
      OR: [{ id }, { slug }],
    },
    include: {
      authors: true,
      categories: true,
      countries: true,
      casts: {
        include: {
          people: true,
        },
      },
    },
  });

  if (!drama || drama?.type !== "drama") return null;

  const dramaValues: DramaWithAuthor = {
    ...drama,
    type: "drama",
  };

  return dramaValues;
};
