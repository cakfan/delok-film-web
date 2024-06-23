import { FC } from "react";
import { User } from "@prisma/client";
import { ReviewWithAuthor } from "@/types/post/review";
import { Each } from "@/components/ui/Each";
import ReviewCard from "@/components/card/review";

interface ReviewsListProps {
  reviews: ReviewWithAuthor[] | null;
  me: User | null;
}

const ReviewsList: FC<ReviewsListProps> = async ({ reviews, me }) => {
  const filteredReviews = reviews?.filter((review) => review.userId !== me?.id);

  if (!reviews?.length) {
    return (
      <div className="review-list prose mt-10 flex flex-col gap-4 dark:prose-invert lg:prose-xl">
        <p>Not rated yet</p>
      </div>
    );
  }

  if (filteredReviews?.length) {
    return (
      <div className="review-list mt-10 flex flex-col gap-4">
        <Each
          of={filteredReviews}
          render={(review) => <ReviewCard data={review} />}
        />
      </div>
    );
  }
};

export default ReviewsList;
