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
    const addCategories =
      data.categories?.map((category) => ({ id: category.id })) || [];

    // Check if related countries exist
    const addCountries =
      data.countries?.map((country) => ({ id: country.id })) || [];

    // Prepare data for nested creation
    const createMovieData = data
      ? {
          director: data.director,
          poster: data.poster ?? undefined,
          trailer: data.trailer ?? undefined,
          contentRating: data.contentRating ?? undefined,
          screenWriter: data.screenWriter ?? undefined,
          releaseDate: data.releaseDate ?? undefined,
          categories: {
            connect: addCategories,
          },
          countries: {
            connect: addCountries,
          },
          casts: {
            create:
              data.casts?.map((cast) => ({
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
        lastEditBy: me?.id!,
        authors: {
          connect: [{ id: me?.id }],
        },
        categories: {
          connect: addCategories,
        },
        countries: {
          connect: addCountries,
        },
        casts: {
          create:
            data.casts?.map((cast) => ({
              peopleId: cast.peopleId,
              characterName: cast.characterName ?? undefined,
            })) ?? [],
        },
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
