"use server";

import prismadb from "@/config/prisma";
import { PostWithAuthors } from "@/types/post";

interface PostProps {
  skip?: number;
  take?: number;
  category?: string;
  country?: string;
  query?: string;
  status?: "draft" | "public";
  sortBy?: "update" | "create";
  sortOrder?: "asc" | "desc";
}

export const getAllPost = async ({
  skip,
  take,
  category,
  country,
  query,
  status,
  sortBy = "update",
  sortOrder = "desc",
}: PostProps): Promise<PostWithAuthors[] | null> => {
  const orderBy = {
    update: { updatedAt: sortOrder },
    create: { createdAt: sortOrder },
  };
  const posts = await prismadb.post.findMany({
    skip: skip || undefined,
    take: take || undefined,
    orderBy: orderBy[sortBy],
    where: {
      status: status || undefined,
      OR: [
        { title: { contains: query || undefined, mode: "insensitive" } },
        { content: { contains: query || undefined, mode: "insensitive" } },
        {
          categories: { some: { slug: category || undefined } },
        },
        {
          countries: { some: { slug: country || undefined } },
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
