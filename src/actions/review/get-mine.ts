import prismadb from "@/config/prisma";
import { ReviewWithAuthor } from "@/types/post/review";
import { getMe } from "../user";

export const getMyReview = async (
  id: string,
): Promise<ReviewWithAuthor | null> => {
  const me = await getMe();

  if (!me) {
    return null;
  }
  const review = await prismadb.review.findFirst({
    where: {
      userId: me.id,
      OR: [{ dramaId: id }, { movieId: id }],
    },
    include: {
      author: true,
    },
  });
  return review;
};
