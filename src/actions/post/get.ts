import prismadb from "@/config/prisma";
import { PostWithMovieAndDrama } from "@/types/post";

export const getPost = async ({
  id,
  slug,
}: {
  id?: string;
  slug?: string;
}): Promise<PostWithMovieAndDrama | null> => {
  const post = await prismadb.post.findFirst({
    where: {
      OR: [{ id }, { slug }],
    },
    include: {
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
      drama: {
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

  return post;
};
