import prismadb from "@/config/prisma";
import { PostWithAuthors } from "@/types/post";

interface PostProps {
  skip?: number;
  take?: number;
  username: string;
}

export const getPostsByAuthor = async ({
  skip = 0,
  take = 10,
  username,
}: PostProps): Promise<PostWithAuthors[] | null> => {
  const posts = await prismadb.post.findMany({
    skip,
    take,
    where: {
      status: "public",
      OR: [{ authors: { some: { username } } }],
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

  const postsValues: PostWithAuthors[] = posts.map((post) => ({
    ...post,
    type: post.type === "drama" ? "drama" : "movie",
  }));

  return postsValues;
};
