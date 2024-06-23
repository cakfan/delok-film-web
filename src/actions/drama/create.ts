"use server";

import prismadb from "@/config/prisma";
import { getPermission } from "./permission";
import { getDrama } from "./get";
import { getMe } from "../user";
import { PostStatus } from "@prisma/client";
import { DramaFormValues } from "@/types/post/drama";

export const createDrama = async (data: DramaFormValues) => {
  try {
    const isAllowed = await getPermission(["admin", "contributor"]);

    if (!isAllowed) {
      return {
        status: "denied",
        message: "You don't have permission",
      };
    }

    const checkPost = await getDrama({ id: data.id, slug: data.slug });

    if (checkPost) {
      return {
        status: "conflict",
        message: "Post already exists",
      };
    }

    // Check if related categories exist
    const categoryIds =
      data.drama?.categories?.map((category) => category.id) || [];
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
      data.drama?.countries?.map((country) => country.id) || [];
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
    const createDramaData = data.drama
      ? {
          director: data.drama.director,
          poster: data.drama.poster ?? undefined,
          trailer: data.drama.trailer ?? undefined,
          contentRating: data.drama.contentRating ?? undefined,
          screenWriter: data.drama.screenWriter ?? undefined,
          episodes: data.drama.episodes,
          network: data.drama.network ?? undefined,
          airedStart: data.drama.airedStart ?? undefined,
          airedEnd: data.drama.airedEnd ?? undefined,
          airedOn: data.drama.airedOn ?? undefined,
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
              data.drama.casts?.map((cast) => ({
                peopleId: cast.peopleId,
                characterName: cast.characterName ?? undefined,
              })) ?? [],
          },
        }
      : undefined;

    const me = await getMe();

    const { id, status, ...drama } = data;

    const created = await prismadb.post.create({
      data: {
        ...drama,
        status: data.status as PostStatus,
        lastEditById: me?.id!,
        authors: {
          connect: [{ id: me?.id }],
        },
        drama: createDramaData ? { create: createDramaData } : undefined,
      },
      include: {
        authors: true,
        drama: {
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
      message: "Drama created",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};
