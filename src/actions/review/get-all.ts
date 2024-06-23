import prismadb from "@/config/prisma";
import { ReviewWithAuthor } from "@/types/post/review";

export const getAllReviews = async (): Promise<ReviewWithAuthor[] | null> => {
  const reviews = await prismadb.review.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      author: true,
    },
  });
  return reviews;
};
