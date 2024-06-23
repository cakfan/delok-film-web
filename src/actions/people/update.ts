"use server";

import prismadb from "@/config/prisma";
import { PeopleFormValues } from "@/types/post/people";
import { getPermission } from "./permission";
import { getPeople } from "./get";
import { getMe } from "../user";
import { Gender } from "@prisma/client";

export const updatePeople = async (data: PeopleFormValues) => {
  try {
    const isAllowed = await getPermission(["admin", "contributor"]);

    if (!isAllowed) {
      return {
        status: "denied",
        message: "You don't have permission",
      };
    }

    const checkPeople = await getPeople({ id: data.id, slug: data.slug });

    if (!checkPeople) {
      return {
        status: "notFound",
        message: "People not found",
      };
    }

    const me = await getMe();

    const { id, gender, countryId, ...people } = data;

    const isAuthorExist = checkPeople.authors.map(
      (author) => author.id === me?.id,
    );
    const authors = isAuthorExist
      ? [...checkPeople.authors.map((author) => ({ id: author.id }))]
      : [
          ...checkPeople.authors.map((author) => ({ id: author.id })),
          { id: me?.id },
        ];

    const updated = await prismadb.people.update({
      where: { id: data.id },
      data: {
        ...people,
        gender: gender as Gender,
        lastEditById: me?.id!,
        authors: {
          set: authors,
        },
      },
      include: {
        authors: true,
      },
    });
    return {
      status: "success",
      message: "People updated",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};
