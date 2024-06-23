"use server";

import prismadb from "@/config/prisma";
import { PeopleFormValues } from "@/types/post/people";
import { getPermission } from "./permission";
import { getPeople } from "./get";
import { getMe } from "../user";
import { Gender } from "@prisma/client";

export const createPeople = async (data: PeopleFormValues) => {
  try {
    const isAllowed = await getPermission(["admin", "contributor"]);

    if (!isAllowed) {
      return {
        status: "denied",
        message: "You don't have permission",
      };
    }

    const checkPeople = await getPeople({ id: data.id, slug: data.slug });

    if (checkPeople) {
      return {
        status: "conflict",
        message: "People already exists",
      };
    }

    const me = await getMe();

    const { id, gender, ...people } = data;

    const created = await prismadb.people.create({
      data: {
        ...people,
        gender: gender as Gender,
        lastEditById: me?.id!,
        authors: {
          connect: [{ id: me?.id! }],
        },
      },
      include: {
        authors: true,
      },
    });
    return {
      status: "success",
      message: "People created",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};
