import { FC } from "react";
import { PostWithAuthors } from "@/types/post";
import { calculateAverageRating, getReviews } from "@/actions/review";
import { Ratings } from "@/components/ui/rating";
import { Progress } from "@/components/ui/progress";
import { getMe } from "@/actions/user";
import ReviewForm from "./form";
import ReviewsList from "./list";
import ReviewBar from "./review-bar";

interface ReviewProps {
  post: PostWithAuthors;
}

const Review: FC<ReviewProps> = async ({ post }) => {
  if (!post.id) return null;
  const reviews = (await getReviews(post.id)) ?? [];
  const me = await getMe();
  const myReview =
    reviews?.filter((review) => review.userId === me?.id)?.at(0) ?? null;

  return (
    <section id="reviews" className="py-10">
      <div className="flex w-full flex-col gap-8">
        <div className="prose dark:prose-invert lg:prose-xl">
          <h2>Rating & Reviews</h2>
        </div>
        <ReviewBar reviews={reviews} />
        <ReviewForm id={post.id} me={me} myReview={myReview} />
        <ReviewsList reviews={reviews} me={me} />
      </div>
    </section>
  );
};

export default Review;
