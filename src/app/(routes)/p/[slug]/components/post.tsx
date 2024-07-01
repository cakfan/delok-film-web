import { Suspense } from "react";
import { calculateAverageRating } from "@/actions/review";
import { notFound } from "next/navigation";
import Review from "@/app/(routes)/p/[slug]/components/review";
import DetailCast from "./casts";
import { Ratings } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { CalendarFoldIcon } from "lucide-react";
import RelatedPost from "./related";
import FooterComponent from "@/components/footer";
import PostSkeleton from "@/components/card/skeleton";
import ReviewSkeleton from "./review/skeleton";
import CategoriesItems from "./categories";
import { getPost } from "@/actions/post";
import MoreInfo from "./info";

const PostResult = async ({ slug }: { slug?: string }) => {
  const post = await getPost({ slug });

  if (!post) notFound();

  const rating = await calculateAverageRating(post.id!);

  const isMovie = post.type === "movie";

  const releaseDate = format(
    (isMovie ? post.releaseDate : post.airedStart) ?? new Date(),
    "PP",
    {
      locale: enUS,
    },
  );
  return (
    <div className="flex w-full flex-wrap justify-center p-10 md:gap-24 lg:gap-40 lg:px-20">
      <div className="flex flex-1 flex-col gap-8">
        <div className="prose flex w-full justify-between dark:prose-invert lg:prose-xl">
          <Badge
            className={cn("w-fit font-bold", !post.contentRating && "hidden")}
          >
            {post.contentRating}
          </Badge>
          <span className="ml-auto flex items-center gap-2 font-semibold text-muted-foreground">
            <CalendarFoldIcon className="h-4 w-4" />
            {releaseDate}
          </span>
        </div>
        <div className="prose flex flex-wrap items-start gap-2 dark:prose-invert lg:prose-xl">
          <h1 className="w-full lg:flex-1">
            {post.title}{" "}
            {`(${isMovie ? post.releaseDate?.getFullYear() : post.airedStart?.getFullYear()})`}
          </h1>
          <a
            href={`#reviews`}
            className="flex items-center gap-2 no-underline"
            title="Rating & Reviews"
          >
            <span className="font-semibold">
              {rating?.average} <span className="text-xs">/5</span>
            </span>
            <Ratings
              rating={rating?.average ?? 0}
              disabled
              iconSize="small"
              variant="yellow"
            />
          </a>
        </div>
        <div className="flex flex-col md:hidden">
          <MoreInfo post={post} />
        </div>
        <div
          className="content prose text-balance dark:prose-invert lg:prose-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="categories flex flex-wrap gap-4 py-10">
          <CategoriesItems post={post} />
        </div>
        <DetailCast post={post} />

        <Suspense fallback={<ReviewSkeleton total={4} />}>
          <Review post={post} />
        </Suspense>
      </div>
      <div className="flex w-full flex-col md:w-1/4">
        <div className="hidden flex-col md:flex">
          <MoreInfo post={post} />
        </div>

        <Suspense fallback={<PostSkeleton />}>
          <RelatedPost post={post} />
        </Suspense>
        <FooterComponent />
      </div>
    </div>
  );
};

export default PostResult;
