import { FC } from "react";
import { getPost } from "@/actions/post";
import { calculateAverageRating } from "@/actions/review";
import PostSkeleton from "@/components/card/skeleton";
import FooterComponent from "@/components/footer";
import { countryFlag } from "@/components/icons";
import TrailerDialog from "@/components/trailer";
import { Each } from "@/components/ui/Each";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Ratings } from "@/components/ui/rating";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { CalendarFoldIcon } from "lucide-react";
import { notFound } from "next/navigation";
import DetailCast from "../casts";
import RelatedPost from "../related";
import Review from "../review";
import ReviewSkeleton from "../review/skeleton";
import Link from "next/link";
import Image from "next/image";

interface PostProps {
  slug?: string;
}

const PostComponent: FC<PostProps> = async ({ slug }) => {
  const post = await getPost({ slug });

  if (!post) notFound();

  const rating = post.drama?.id
    ? await calculateAverageRating(post.drama?.id)
    : await calculateAverageRating(post.movie?.id!);

  const releaseDate = format(
    post.drama?.airedStart ?? post.movie?.releaseDate!,
    "PP",
    { locale: enUS },
  );

  const airedRange =
    post.type === "drama" && post.drama?.airedStart && post.drama?.airedEnd
      ? `${format(post.drama?.airedStart, "PP", { locale: enUS })} - ${format(post.drama?.airedEnd, "PP", { locale: enUS })}`
      : "NA";
  return (
    <div className="flex w-full flex-wrap justify-center p-10 md:gap-24 lg:gap-40 lg:px-20">
      <div className="flex flex-1 flex-col gap-8">
        <div className="prose flex w-full justify-between dark:prose-invert lg:prose-xl">
          <Badge
            className={cn(
              "w-fit font-bold",
              !post.drama?.contentRating &&
                !post.movie?.contentRating &&
                "hidden",
            )}
          >
            {post.drama?.contentRating ?? post.movie?.contentRating ?? ""}
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
          <Each
            of={post.drama?.categories ?? post.movie?.categories!}
            render={(category) => (
              <Link
                href={`/category?q=${category.slug!}`}
                title={category.name ?? "NA"}
                className={cn(
                  badgeVariants({ variant: "secondary" }),
                  "prose no-underline dark:prose-invert lg:prose-xl",
                )}
              >
                {category.name}
              </Link>
            )}
          />
        </div>
        <DetailCast post={post} />

        {/* <Suspense fallback={<ReviewSkeleton total={4} />}> */}
        <Review post={post} />
        {/* </Suspense> */}
      </div>
      <div className="flex w-full flex-col md:w-1/4">
        <div className="relative mb-4 w-full overflow-hidden rounded-md">
          <AspectRatio ratio={9 / 16}>
            <Image
              src={post.drama?.poster ?? post.movie?.poster ?? "/no-image.png"}
              alt={post.title}
              fill
              className="m-0 overflow-hidden rounded-md object-cover transition-all duration-300 group-hover:scale-105"
            />
          </AspectRatio>
        </div>
        <TrailerDialog
          title={post.title}
          url={post.drama?.trailer || post.movie?.trailer}
        />
        <div className="detail prose mt-10 flex flex-col gap-2 rounded-md border border-input px-3 py-2 ring-offset-background dark:prose-invert">
          <h2>Details</h2>
          <div className="w-full">
            <span className="font-bold">Native Title: </span> {post.nativeTitle}
          </div>
          <div className="w-full">
            <span className="font-bold">Director: </span>{" "}
            {post.drama?.director ?? post.movie?.director ?? "NA"}
          </div>
          <div className="w-full">
            <span className="font-bold">Screenwriter: </span>{" "}
            {post.drama?.screenWriter ?? post.movie?.screenWriter ?? "NA"}
          </div>
          {post.type === "drama" && (
            <>
              <div className="w-full">
                <span className="font-bold">AiredOn: </span>{" "}
                {post.drama?.airedOn ?? "NA"}
              </div>
              <div className="w-full">
                <span className="font-bold">Aired Date: </span> {airedRange}
              </div>
              <div className="w-full">
                <span className="font-bold">Network: </span>{" "}
                {post.drama?.network ?? "NA"}
              </div>
            </>
          )}
          <div className="flex w-full flex-wrap gap-2">
            <span className="w-fit font-bold">Country: </span>{" "}
            <span className="flex-1">
              <Each
                of={post.drama?.countries ?? post.movie?.countries!}
                render={(country) => (
                  <Link
                    href={`/country/${country.slug!}`}
                    title={country.name ?? "NA"}
                    className="flex items-center gap-1 no-underline hover:text-primary"
                  >
                    {countryFlag(country.name!)}
                    <span>{country.name}</span>
                  </Link>
                )}
              />
            </span>
          </div>
        </div>

        {/* <Suspense fallback={<PostSkeleton />}> */}
        <RelatedPost postId={post.id!} />
        {/* </Suspense> */}
        <FooterComponent />
      </div>
    </div>
  );
};

export default PostComponent;
