import prismadb from "@/config/prisma";
import { PostWithAuthors } from "@/types/post";

export const getRelated = async (
  postId: string,
): Promise<PostWithAuthors[] | null> => {
  const post = await prismadb.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      categories: true,
      countries: true,
      casts: { include: { people: true } },
    },
  });

  if (!post) return null;

  // Extract relevant IDs for categories, countries, and casts
  const categoryIds = post.categories.map((category) => category.id) || [];
  const countryIds = [...(post.countries.map((country) => country.id) || [])];
  const castIds = [...(post.casts.map((cast) => cast.peopleId) || [])];

  const posts = await prismadb.post.findMany({
    where: {
      id: { not: postId },
      OR: [
        {
          categories: {
            some: {
              id: { in: categoryIds },
            },
          },
        },
        {
          countries: {
            some: {
              id: { in: countryIds },
            },
          },
        },
        {
          casts: {
            some: {
              peopleId: { in: castIds },
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
