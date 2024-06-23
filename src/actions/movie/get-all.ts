import prismadb from "@/config/prisma";
import { PostWithMovieAndCountries } from "@/types/post/movie";

export const getAllMovies = async (): Promise<
  PostWithMovieAndCountries[] | null
> => {
  const movies = await prismadb.post.findMany({
    where: {
      type: "movie",
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      movie: {
        include: {
          countries: true,
        },
      },
    },
  });

  return movies;
};
