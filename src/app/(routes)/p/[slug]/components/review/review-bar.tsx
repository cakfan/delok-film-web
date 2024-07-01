import { FC } from "react";
import { Progress } from "@/components/ui/progress";
import { Ratings } from "@/components/ui/rating";
import { ReviewWithAuthor } from "@/types/post/review";
import { calculateAverageRatingClient } from "@/actions/review";

interface ReviewBarProps {
  reviews: ReviewWithAuthor[];
}

const ReviewBar: FC<ReviewBarProps> = ({ reviews }) => {
  const rating = calculateAverageRatingClient({ reviews });
  const ratingValue = (i: number) =>
    (rating?.ratingCounts?.[5 - i]! / (reviews.length ?? 0)) * 100 ?? 0;
  return (
    <div className="prose flex w-full items-center gap-8 dark:prose-invert lg:prose-xl">
      <Ratings
        rating={rating.average}
        total={reviews.length}
        variant="yellow"
        disabled
        showText
      />

      <div className="flex flex-1 flex-col">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i + 1} className="flex w-full items-center gap-2">
            <span className="text-sm font-medium">{5 - i}</span>
            <Progress
              value={ratingValue(i)}
              aria-label={`Star value ${ratingValue(i)}`}
              className="h-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewBar;
