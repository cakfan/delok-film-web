import prismadb from "@/config/prisma";
import { ReviewWithAuthor } from "@/types/post/review";

export const getReviews = async (
  id: string,
): Promise<ReviewWithAuthor[] | null> => {
  const reviews = await prismadb.review.findMany({
    where: {
      postId: id,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      author: true,
    },
  });
  return reviews;
};
