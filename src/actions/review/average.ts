import prismadb from "@/config/prisma";

export const calculateAverageRating = async (
  id: string,
): Promise<{ average: number; ratingCounts: Record<number, number> }> => {
  const reviews = await prismadb.review.findMany({
    where: {
      postId: id,
    },
  });

  const ratingCounts: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  reviews.forEach((review) => {
    const value = review.value;
    if (value >= 1 && value <= 5) {
      ratingCounts[value]++;
    }
  });

  const totalReviews = reviews.length;
  const totalRating = Object.entries(ratingCounts).reduce(
    (sum, [value, count]) => sum + parseInt(value) * count,
    0,
  );

  // Handle the case when there are no reviews
  const averageRating = totalReviews === 0 ? 0 : totalRating / totalReviews;

  return {
    average: Number(averageRating.toFixed(1)),
    ratingCounts,
  };
};
