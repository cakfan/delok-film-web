import prismadb from "@/config/prisma";
import { MovieFormValues, PostWithMovieDetail } from "@/types/post/movie";
import { toast } from "sonner";

export const getMovie = async ({
  id,
  slug,
}: {
  id?: string;
  slug?: string;
}): Promise<PostWithMovieDetail | null> => {
  if (!id && !slug) {
    const msg = "You have to provide an id or slug";
    toast.error(msg);
    return null;
  }

  const movie = await prismadb.post.findFirst({
    where: {
      OR: [{ id }, { slug }],
    },
    include: {
      authors: true,
      movie: {
        include: {
          categories: true,
          countries: true,
          casts: {
            include: {
              people: true,
            },
          },
        },
      },
    },
  });

  return movie;
};
