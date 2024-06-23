"use server";

import prismadb from "@/config/prisma";
import { ReviewFormValues } from "@/types/post/review";
import { getMe } from "../user";

export const createReview = async (data: ReviewFormValues) => {
  try {
    const me = await getMe();

    if (!me) {
      return {
        status: "error",
        message: "You have to sign in",
      };
    }

    const created = await prismadb.review.create({
      data: {
        ...data,
        userId: me.id,
      },
    });

    return {
      status: "success",
      message: "Review created",
      data: created,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};
