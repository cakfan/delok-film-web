"use server";

import prismadb from "@/config/prisma";
import { calculateAverageRatingClient } from "./average-client";

export const calculateAverageRating = async (
  id: string,
): Promise<{ average: number; ratingCounts: Record<number, number> }> => {
  const reviews = await prismadb.review.findMany({
    where: {
      postId: id,
    },
    include: {
      author: true,
    },
  });

  return calculateAverageRatingClient({ reviews });
};
