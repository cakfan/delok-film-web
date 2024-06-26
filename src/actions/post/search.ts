import prismadb from "@/config/prisma";
import { PostWithAuthors } from "@/types/post";

interface PostProps {
  skip?: number;
  take?: number;
  query?: string;
}

export const searchPost = async ({
  skip = 0,
  take = 10,
  query,
}: PostProps): Promise<PostWithAuthors[] | null> => {
  const posts = await prismadb.post.findMany({
    skip,
    take,
    where: {
      status: "public",
      OR: [
        { title: { contains: query ?? undefined, mode: "insensitive" } },
        { content: { contains: query ?? undefined, mode: "insensitive" } },
        {
          casts: {
            some: {
              people: { name: { contains: query ?? "", mode: "insensitive" } },
            },
          },
        },
      ],
    },
    include: {
      categories: true,
      countries: true,
      casts: {
        include: {
          people: true,
        },
      },
    },
  });

  const postsValues: PostWithAuthors[] = posts.map((post) => ({
    ...post,
    type: post.type === "drama" ? "drama" : "movie",
  }));

  return postsValues;
};
