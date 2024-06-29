import prismadb from "@/config/prisma";
import { PostWithAuthors } from "@/types/post";

interface PostProps {
  skip?: number;
  take?: number;
  category?: string;
  sortBy?: "update" | "create";
  sortOrder?: "asc" | "desc";
}

export const getPostByCategory = async ({
  skip = 0,
  take = 10,
  category,
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
          categories: { some: { slug: category ?? undefined } },
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
      reviews: true,
    },
  });

  const postsValues: PostWithAuthors[] = posts.map((post) => ({
    ...post,
    type: post.type === "drama" ? "drama" : "movie",
  }));

  return postsValues;
};
