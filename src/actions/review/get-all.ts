import prismadb from "@/config/prisma";
import { ReviewWithPost } from "@/types/post/review";

export const getAllReviews = async (): Promise<ReviewWithPost[] | null> => {
  const reviews = await prismadb.review.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      author: true,
      post: true,
    },
  });
  return reviews;
};
