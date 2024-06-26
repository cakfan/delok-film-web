import prismadb from "@/config/prisma";
import { MovieWithAuthor } from "@/types/post/movie";

export const getAllMovies = async (): Promise<MovieWithAuthor[] | null> => {
  const movies = await prismadb.post.findMany({
    where: {
      type: "movie",
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

  if (!movies.length) return null;

  const moviesValues: MovieWithAuthor[] = movies.map((movie) => ({
    ...movie,
    type: "movie",
  }));

  return moviesValues;
};
