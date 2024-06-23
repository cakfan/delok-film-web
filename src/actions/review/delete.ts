"use server";

import prismadb from "@/config/prisma";
import { getMe } from "../user";

export const deleteReview = async (id: string) => {
  try {
    const me = await getMe();

    if (!me) {
      return {
        status: "error",
        message: "You have to login",
      };
    }

    const review = await prismadb.review.findUnique({
      where: {
        id,
      },
    });

    if (!review) {
      return {
        status: "error",
        message: "Review not found",
      };
    }

    if (review.userId !== me?.id) {
      return {
        status: "error",
        message: "You can't remove this review",
      };
    }

    const deleted = await prismadb.review.delete({
      where: { id },
    });
    return {
      status: "success",
      message: "Review deleted",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};
