"use server";

import prismadb from "@/config/prisma";
import { getPermission } from "./permission";
import { getMovie } from "./get";
import { getMe } from "../user";
import { PostStatus } from "@prisma/client";
import { MovieFormValues } from "@/types/post/movie";

export const updateMovie = async (data: MovieFormValues) => {
  try {
    const isAllowed = await getPermission(["admin", "contributor"]);

    if (!isAllowed) {
      return {
        status: "denied",
        message: "You don't have permission",
      };
    }

    const checkMovie = await getMovie({ id: data.id, slug: data.slug });

    if (!checkMovie) {
      return {
        status: "notFound",
        message: "Movie not found",
      };
    }

    const me = await getMe();

    const isAuthorExist = checkMovie.authors?.map(
      (author) => author.id === me?.id,
    );

    let authors: { id: string }[] = [];
    if (checkMovie?.authors) {
      authors = isAuthorExist
        ? [...checkMovie?.authors?.map((author) => ({ id: author.id }))]
        : [
            ...checkMovie?.authors?.map((author) => ({ id: author.id })),
            { id: me?.id! },
          ];
    }

    // Check if related categories exist
    const newCategories =
      data.categories
        ?.filter((category) => !checkMovie.categories?.includes(category))
        .map((category) => ({ id: category.id })) || [];
    const deletedCategories = checkMovie.categories
      ?.filter((category) => !newCategories.includes(category))
      .map((category) => ({ id: category.id }));

    // Check if related countries exist
    const newCountries =
      data.countries
        ?.filter((country) => !checkMovie.countries?.includes(country))
        .map((country) => ({ id: country.id })) || [];
    const deletedCountries = checkMovie.countries
      ?.filter((country) => !newCountries.includes(country))
      .map((country) => ({ id: country.id }));

    // Formatted casts
    const newCasts = data.casts?.map((cast) => ({
      peopleId: cast.peopleId,
      characterName: cast.characterName,
    }));

    console.log("cast:", newCasts);

    const { id, status, ...movie } = data;

    const updated = await prismadb.post.update({
      where: { id: data.id },
      data: {
        ...movie,
        status: data.status as PostStatus,
        lastEditBy: me?.id!,
        authors: {
          set: authors,
        },
        categories: {
          disconnect: deletedCategories,
          set: newCategories ?? undefined,
        },
        countries: {
          disconnect: deletedCountries,
          set: newCountries ?? undefined,
        },
        casts: {
          deleteMany: {},
          create: newCasts ?? [],
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
      message: "Movie updated",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};
