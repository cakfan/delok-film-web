import prismadb from "@/config/prisma";
import { PostWithMovieAndDrama } from "@/types/post";

export const getRelated = async (
  postId: string,
): Promise<PostWithMovieAndDrama[] | null> => {
  const post = await prismadb.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      movie: {
        include: {
          categories: true,
          countries: true,
          casts: { include: { people: true } },
        },
      },
      drama: {
        include: {
          categories: true,
          countries: true,
          casts: { include: { people: true } },
        },
      },
    },
  });

  if (!post) return null;

  // Extract relevant IDs for categories, countries, and casts
  const movieCategoryIds =
    post.movie?.categories.map((category) => category.id) || [];
  const dramaCategoryIds =
    post.drama?.categories.map((category) => category.id) || [];
  const countryIds = [
    ...(post.movie?.countries.map((country) => country.id) || []),
    ...(post.drama?.countries.map((country) => country.id) || []),
  ];
  const castIds = [
    ...(post.movie?.casts.map((cast) => cast.peopleId) || []),
    ...(post.drama?.casts.map((cast) => cast.peopleId) || []),
  ];

  const movies = await prismadb.post.findMany({
    where: {
      id: { not: postId },
      OR: [
        // Filter by movie categories, countries, and casts
        {
          movie: {
            OR: [
              {
                categories: {
                  some: {
                    id: { in: movieCategoryIds },
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
        },
        // Filter by drama categories, countries, and casts
        {
          drama: {
            OR: [
              {
                categories: {
                  some: {
                    id: { in: dramaCategoryIds },
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
        },
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

  return movies;
};
