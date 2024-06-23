import ReviewCard from "@/components/card/review";
import { Each } from "@/components/ui/Each";
import { ReviewWithAuthor } from "@/types/post/review";
import { FC } from "react";

interface ReviewsListProps {
  reviews: ReviewWithAuthor[] | null;
  myReview: ReviewWithAuthor | null;
}

const ReviewsList: FC<ReviewsListProps> = ({ reviews, myReview }) => {
  const filteredReviews = reviews?.filter(
    (review) => review.id !== myReview?.id,
  );

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
