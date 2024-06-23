import prismadb from "@/config/prisma";
import { PostWithMovieAndDrama } from "@/types/post";

interface PostProps {
  skip?: number;
  take?: number;
  query?: string;
}

export const searchPost = async ({
  skip = 0,
  take = 10,
  query,
}: PostProps): Promise<PostWithMovieAndDrama[] | null> => {
  const posts = await prismadb.post.findMany({
    skip,
    take,
    where: {
      status: "public",
      OR: [
        { title: { contains: query ?? undefined, mode: "insensitive" } },
        { content: { contains: query ?? undefined, mode: "insensitive" } },
      ],
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

  return posts;
};
