import prismadb from "@/config/prisma";
import { DramaWithAuthor } from "@/types/post/drama";

export const getAllDramas = async (): Promise<DramaWithAuthor[] | null> => {
  const dramas = await prismadb.post.findMany({
    where: {
      type: "drama",
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      authors: true,
      casts: {
        include: {
          people: true,
        },
      },
      categories: true,
      countries: true,
    },
  });

  if (!dramas.length) return null;

  const dramasValues: DramaWithAuthor[] = dramas.map((drama) => ({
    ...drama,
    type: "drama",
  }));

  return dramasValues;
};
