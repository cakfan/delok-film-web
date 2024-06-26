import prismadb from "@/config/prisma";
import { PostWithAuthors } from "@/types/post";

interface PostProps {
  skip?: number;
  take?: number;
  country?: string;
  query?: string;
  sortBy?: "update" | "create";
  sortOrder?: "asc" | "desc";
}

export const getPostByCountry = async ({
  skip = 0,
  take = 10,
  country,
  query,
  sortBy = "update",
  sortOrder = "desc",
}: PostProps): Promise<PostWithAuthors[] | null> => {
  const orderBy = {
    update: { updatedAt: sortOrder },
    create: { createdAt: sortOrder },
  };
  const posts = await prismadb.post.findMany({
    skip,
    take,
    orderBy: orderBy[sortBy],
    where: {
      status: "public",
      OR: [
        {
          countries: { some: { slug: country ?? undefined } },
        },
      ],
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

  const postsValues: PostWithAuthors[] = posts.map((post) => ({
    ...post,
    type: post.type === "drama" ? "drama" : "movie",
  }));

  return postsValues;
};
