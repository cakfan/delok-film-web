"use server";

import prismadb from "@/config/prisma";
import { getPermission } from "./permission";
import { getDrama } from "./get";
import { getMe } from "../user";
import { PostStatus } from "@prisma/client";
import { DramaFormValues } from "@/types/post/drama";

export const updateDrama = async (data: DramaFormValues) => {
  try {
    const isAllowed = await getPermission(["admin", "contributor"]);

    if (!isAllowed) {
      return {
        status: "denied",
        message: "You don't have permission",
      };
    }

    const checkDrama = await getDrama({ id: data.id, slug: data.slug });

    if (!checkDrama) {
      return {
        status: "notFound",
        message: "Drama not found",
      };
    }

    const me = await getMe();

    const isAuthorExist = checkDrama.authors?.map(
      (author) => author.id === me?.id,
    );

    let authors: { id: string }[] = [];
    if (checkDrama?.authors) {
      authors = isAuthorExist
        ? [...checkDrama?.authors?.map((author) => ({ id: author.id }))]
        : [
            ...checkDrama?.authors?.map((author) => ({ id: author.id })),
            { id: me?.id! },
          ];
    }

    // Check if related categories exist
    const newCategories =
      data.categories
        ?.filter((category) => !checkDrama.categories?.includes(category))
        .map((category) => ({ id: category.id })) || [];
    const deletedCategories = checkDrama.categories
      ?.filter((category) => !newCategories.includes(category))
      .map((category) => ({ id: category.id }));

    // Check if related countries exist
    const newCountries =
      data.countries
        ?.filter((country) => !checkDrama.countries?.includes(country))
        .map((country) => ({ id: country.id })) || [];
    const deletedCountries = checkDrama.countries
      ?.filter((country) => !newCountries.includes(country))
      .map((country) => ({ id: country.id }));

    // Formatted casts
    const newCasts = data.casts?.map((cast) => ({
      peopleId: cast.peopleId,
      characterName: cast.characterName,
    }));

    const { id, status, ...drama } = data;

    const updated = await prismadb.post.update({
      where: { id: data.id },
      data: {
        ...drama,
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
      message: "Drama updated",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};
