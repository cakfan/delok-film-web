import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { getPost } from "@/actions/post";
import { calculateAverageRating } from "@/actions/review";
import { notFound } from "next/navigation";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import TrailerDialog from "@/components/trailer";
import Review from "@/app/(routes)/p/[slug]/components/review";
import DetailCast from "./components/casts";
import { Ratings } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { CalendarFoldIcon } from "lucide-react";
import RelatedPost from "./components/related";
import FooterComponent from "@/components/footer";
import PostSkeleton from "@/components/card/skeleton";
import ReviewSkeleton from "./components/review/skeleton";
import CategoriesItems from "./components/categories";
import CountriesItems from "./components/countries";

interface DetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params: { slug },
}: DetailPageProps): Promise<Metadata> {
  const post = await getPost({ slug });
  return {
    title: post?.title,
    description: post?.content,
    openGraph: {
      title: post?.title,
      description: post?.content,
      images: [post?.poster ?? "/default.png"],
    },
  };
}

export default async function DetailPage({
  params: { slug },
}: DetailPageProps) {
  const post = await getPost({ slug });

  if (!post) notFound();

  const rating = await calculateAverageRating(post.id!);

  const isMovie = post.type === "movie";

  const releaseDate = format(isMovie ? post.releaseDate! : new Date(), "PP", {
    locale: enUS,
  });

  const airedRange =
    !isMovie && post.airedStart && post.airedEnd
      ? `${format(post.airedStart, "PP", { locale: enUS })} - ${format(post.airedEnd, "PP", { locale: enUS })}`
      : "NA";

  return (
    <article className="w-full space-y-4">
      <div className="flex w-full flex-wrap justify-center p-10 md:gap-24 lg:gap-40 lg:px-20">
        <div className="flex flex-1 flex-col gap-8">
          <div className="prose flex w-full justify-between dark:prose-invert lg:prose-xl">
            <Badge
              className={cn("w-fit font-bold", !post.contentRating && "hidden")}
            >
              {post.contentRating ?? ""}
            </Badge>
            <span className="flex items-center gap-2 font-semibold text-muted-foreground">
              <CalendarFoldIcon className="h-4 w-4" />
              {releaseDate}
            </span>
          </div>
          <div className="prose flex items-start gap-2 dark:prose-invert lg:prose-xl">
            <h1 className="flex-1">{post.title}</h1>
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
          <div className="relative mb-4 w-full overflow-hidden rounded-md">
            <AspectRatio ratio={9 / 16}>
              <Image
                src={post.poster ?? "/no-image.png"}
                alt={post.title}
                fill
                className="m-0 overflow-hidden rounded-md object-cover transition-all duration-300 group-hover:scale-105"
              />
            </AspectRatio>
          </div>
          <TrailerDialog title={post.title} url={post.trailer} />
          <div className="detail prose mt-10 flex flex-col gap-2 rounded-md border border-input px-3 py-2 ring-offset-background dark:prose-invert">
            <h2>Details</h2>
            <div className="w-full">
              <span className="font-bold">Native Title: </span>{" "}
              {post.nativeTitle ?? "-"}
            </div>
            <div className="w-full">
              <span className="font-bold">Also knwon as: </span>{" "}
              {post.alsoKnownAs ?? "-"}
            </div>
            <div className="w-full">
              <span className="font-bold">Director: </span>{" "}
              {post.director ?? "-"}
            </div>
            <div className="w-full">
              <span className="font-bold">Screenwriter: </span>{" "}
              {post.screenWriter ?? "-"}
            </div>
            {!isMovie && (
              <>
                <div className="w-full">
                  <span className="font-bold">AiredOn: </span>{" "}
                  {post.airedOn ?? "NA"}
                </div>
                <div className="w-full">
                  <span className="font-bold">Aired Date: </span> {airedRange}
                </div>
                <div className="w-full">
                  <span className="font-bold">Network: </span>{" "}
                  {post.network ?? "NA"}
                </div>
              </>
            )}
            <CountriesItems post={post} />
          </div>

          <Suspense fallback={<PostSkeleton />}>
            <RelatedPost postId={post.id!} />
          </Suspense>
          <FooterComponent />
        </div>
      </div>
    </article>
  );
}
