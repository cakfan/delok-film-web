import prismadb from "@/config/prisma";
import { PostWithMovieAndDrama } from "@/types/post";

interface PostProps {
  skip?: number;
  take?: number;
  people: string;
}

export const getPostsByPeople = async ({
  skip = 0,
  take = 10,
  people,
}: PostProps): Promise<PostWithMovieAndDrama[] | null> => {
  const posts = await prismadb.post.findMany({
    skip,
    take,
    where: {
      status: "public",
      OR: [
        {
          movie: {
            casts: { some: { peopleId: people } },
          },
        },
        {
          drama: {
            casts: { some: { peopleId: people } },
          },
        },
      ],
    },
    include: {
      movie: {
        include: {
          casts: {
            include: {
              people: true,
            },
          },
        },
      },
      drama: {
        include: {
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
