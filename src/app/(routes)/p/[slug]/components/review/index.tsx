import { FC } from "react";
import { PostWithAuthors } from "@/types/post";
import { getReviews } from "@/actions/review";
import { getMe } from "@/actions/user";
import ReviewForm from "./form";
import ReviewsList from "./list";

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
        <ReviewForm
          id={post.id}
          me={me}
          myReview={myReview}
          reviews={reviews}
        />
        <ReviewsList reviews={reviews} me={me} />
      </div>
    </section>
  );
};

export default Review;
