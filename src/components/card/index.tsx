import { PostWithAuthors } from "@/types/post";
import { FC } from "react";
import MovieCard from "./movie";
import DramaCard from "./drama";
import { calculateAverageRatingClient } from "@/actions/review";
import { cn } from "@/lib/utils";

interface DFCardProps {
  post: PostWithAuthors;
  className?: string;
}

const DFCard: FC<DFCardProps> = ({ post, className }) => {
  const ratingCounts: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  const rating = post.reviews
    ? calculateAverageRatingClient({ reviews: post.reviews })
    : { average: 0, ratingCounts };
  return (
    <div
      className={cn("group transition-all duration-300 ease-in-out", className)}
    >
      {post.type === "movie" ? (
        <MovieCard post={post} rating={rating.average} />
      ) : (
        <DramaCard post={post} rating={rating.average} />
      )}
    </div>
  );
};

export default DFCard;
