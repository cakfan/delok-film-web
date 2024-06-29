import prismadb from "@/config/prisma";
import { PostWithAuthors } from "@/types/post";

interface PostProps {
  skip?: number;
  take?: number;
  people: string;
}

export const getPostsByPeople = async ({
  skip = 0,
  take = 10,
  people,
}: PostProps): Promise<PostWithAuthors[] | null> => {
  const posts = await prismadb.post.findMany({
    skip,
    take,
    where: {
      status: "public",
      OR: [{ casts: { some: { peopleId: people } } }],
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
      reviews: true,
    },
  });

  const postsValues: PostWithAuthors[] = posts.map((post) => ({
    ...post,
    type: post.type === "drama" ? "drama" : "movie",
  }));

  return postsValues;
};
