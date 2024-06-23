"use server";

import prismadb from "@/config/prisma";
import { getPermission } from "./permission";
import { getMovie } from "./get";
import { getMe } from "../user";
import { PostStatus } from "@prisma/client";
import { MovieFormValues } from "@/types/post/movie";

export const createMovie = async (data: MovieFormValues) => {
  try {
    const isAllowed = await getPermission(["admin", "contributor"]);

    if (!isAllowed) {
      return {
        status: "denied",
        message: "You don't have permission",
      };
    }

    const checkPost = await getMovie({ id: data.id, slug: data.slug });

    if (checkPost) {
      return {
        status: "conflict",
        message: "Post already exists",
      };
    }

    // Check if related categories exist
    const categoryIds =
      data.movie?.categories?.map((category) => category.id) || [];
    const existingCategories = await prismadb.category.findMany({
      where: {
        id: { in: categoryIds },
      },
      select: { id: true },
    });
    const missingCategories = categoryIds.filter(
      (id) => !existingCategories.some((cat) => cat.id === id),
    );

    // Check if related countries exist
    const countryIds =
      data.movie?.countries?.map((country) => country.id) || [];
    const existingCountries = await prismadb.country.findMany({
      where: {
        id: { in: countryIds },
      },
      select: { id: true },
    });
    const missingCountries = countryIds.filter(
      (id) => !existingCountries.some((country) => country.id === id),
    );

    // Handle missing records
    if (missingCategories.length > 0 || missingCountries.length > 0) {
      return {
        message: "Related records not found",
        missingCategories,
        missingCountries,
      };
    }

    // Prepare data for nested creation
    const createMovieData = data.movie
      ? {
          director: data.movie.director,
          poster: data.movie.poster ?? undefined,
          trailer: data.movie.trailer ?? undefined,
          contentRating: data.movie.contentRating ?? undefined,
          screenWriter: data.movie.screenWriter ?? undefined,
          releaseDate: data.movie.releaseDate ?? undefined,
          categories: {
            connect: existingCategories.map((category) => ({
              id: category.id,
            })),
          },
          countries: {
            connect: existingCountries.map((country) => ({ id: country.id })),
          },
          casts: {
            create:
              data.movie.casts?.map((cast) => ({
                peopleId: cast.peopleId,
                characterName: cast.characterName ?? undefined,
              })) ?? [],
          },
        }
      : undefined;

    const me = await getMe();

    const { id, status, ...movie } = data;

    const created = await prismadb.post.create({
      data: {
        ...movie,
        status: data.status as PostStatus,
        lastEditById: me?.id!,
        authors: {
          connect: [{ id: me?.id }],
        },
        movie: createMovieData ? { create: createMovieData } : undefined,
      },
      include: {
        authors: true,
        movie: {
          include: {
            casts: {
              include: {
                people: true,
              },
            },
            categories: true,
            countries: true,
          },
        },
      },
    });
    return {
      status: "success",
      message: "Movie created",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};
