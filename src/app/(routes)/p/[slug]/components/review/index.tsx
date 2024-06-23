import { FC, Suspense } from "react";
import { PostWithMovieAndDrama } from "@/types/post";
import {
  calculateAverageRating,
  getMyReview,
  getReviews,
} from "@/actions/review";
import { Ratings } from "@/components/ui/rating";
import { Progress } from "@/components/ui/progress";
import { getMe } from "@/actions/user";
import ReviewForm from "./form";
import ReviewsList from "./list";
import ReviewSkeleton from "./skeleton";

interface ReviewProps {
  post: PostWithMovieAndDrama;
}

const Review: FC<ReviewProps> = async ({ post }) => {
  const id = post.drama?.id ?? post.movie?.id;
  const rating = id ? await calculateAverageRating(id) : null;
  const reviews = await getReviews(id!);
  const me = await getMe();
  const myReview =
    reviews?.filter((review) => review.userId === me?.id)?.at(0) ?? null;

  return (
    <section id="reviews" className="py-10">
      <div className="flex w-full flex-col gap-8">
        <div className="prose dark:prose-invert lg:prose-xl">
          <h2>Rating & Reviews</h2>
        </div>
        <Suspense fallback={<ReviewSkeleton total={4} />}>
          <div className="prose flex w-full items-center gap-8 dark:prose-invert lg:prose-xl">
            <Ratings
              rating={reviews?.length ? rating?.average ?? 0 : 0}
              total={reviews?.length}
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
                      (rating?.ratingCounts?.[5 - i]! /
                        (reviews?.length ?? 0)) *
                        100 ?? 0
                    }
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </div>

          <ReviewForm id={id!} type={post.type} me={me} myReview={myReview} />
          <ReviewsList reviews={reviews} me={me} />
        </Suspense>
      </div>
    </section>
  );
};

export default Review;
