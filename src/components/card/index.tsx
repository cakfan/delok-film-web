import { PostWithAuthors } from "@/types/post";
import { FC } from "react";
import MovieCard from "./movie";
import DramaCard from "./drama";
import { calculateAverageRating } from "@/actions/review";
import { cn } from "@/lib/utils";

interface DFCardProps {
  post: PostWithAuthors;
  className?: string;
}

const DFCard: FC<DFCardProps> = async ({ post, className }) => {
  const rating = await calculateAverageRating(post.id!);
  return (
    <div
      className={cn("group transition-all duration-300 ease-in-out", className)}
    >
      {post.type === "movie" ? (
        <MovieCard post={post} rating={rating.average ?? 0} />
      ) : (
        <DramaCard post={post} rating={rating.average ?? 0} />
      )}
    </div>
  );
};

export default DFCard;
