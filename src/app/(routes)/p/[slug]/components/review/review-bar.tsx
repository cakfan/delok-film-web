import { Progress } from "@/components/ui/progress";
import { Ratings } from "@/components/ui/rating";
import { FC } from "react";

interface ReviewBarProps {
  rating: {
    average: number;
    ratingCounts: Record<number, number>;
  };
  totalReviews: number;
}

const ReviewBar: FC<ReviewBarProps> = ({ rating, totalReviews }) => {
  return (
    <div className="prose flex w-full items-center gap-8 dark:prose-invert lg:prose-xl">
      <Ratings
        rating={rating?.average ?? 0}
        total={totalReviews}
        variant="yellow"
        disabled
        showText
      />

      <div className="flex flex-1 flex-col">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i + 1} className="flex w-full items-center gap-2">
            <span className="text-sm font-medium">{5 - i}</span>
            <Progress
              value={
                (rating?.ratingCounts?.[5 - i]! / (totalReviews ?? 0)) * 100 ??
                0
              }
              className="h-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewBar;
