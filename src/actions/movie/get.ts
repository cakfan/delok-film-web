import prismadb from "@/config/prisma";
import { MovieWithAuthor } from "@/types/post/movie";

export const getMovie = async ({
  id,
  slug,
}: {
  id?: string;
  slug?: string;
}): Promise<MovieWithAuthor | null> => {
  if (!id && !slug) {
    return null;
  }

  const movie = await prismadb.post.findFirst({
    where: {
      type: "movie",
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

  if (!movie || movie.type !== "movie") return null;

  const movieValues: MovieWithAuthor = {
    ...movie,
    type: "movie",
  };

  return movieValues;
};
