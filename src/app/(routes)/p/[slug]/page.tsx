// import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { getPost } from "@/actions/post";
import { calculateAverageRating } from "@/actions/review";
import { notFound } from "next/navigation";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Each } from "@/components/ui/Each";
import Link from "next/link";
import TrailerDialog from "@/components/trailer";
import { countryFlag } from "@/components/icons";
import Review from "@/app/(routes)/p/[slug]/components/review";
import DetailCast from "./components/casts";
import { Ratings } from "@/components/ui/rating";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { CalendarFoldIcon } from "lucide-react";
import RelatedPost from "./components/related";
import FooterComponent from "@/components/footer";
import PostSkeleton from "@/components/card/skeleton";
import ReviewSkeleton from "./components/review/skeleton";
import PostComponent from "./components/post";

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
      images: [post?.drama?.poster ?? post?.movie?.poster ?? "/default.png"],
    },
  };
}

export default async function DetailPage({
  params: { slug },
}: DetailPageProps) {
  // const post = await getPost({ slug });

  // if (!post) notFound();

  // const rating = post.drama?.id
  //   ? await calculateAverageRating(post.drama?.id)
  //   : await calculateAverageRating(post.movie?.id!);

  // const releaseDate = format(
  //   post.drama?.airedStart ?? post.movie?.releaseDate!,
  //   "PP",
  //   { locale: enUS },
  // );

  // const airedRange =
  //   post.type === "drama" && post.drama?.airedStart && post.drama?.airedEnd
  //     ? `${format(post.drama?.airedStart, "PP", { locale: enUS })} - ${format(post.drama?.airedEnd, "PP", { locale: enUS })}`
  //     : "NA";

  return (
    <article className="w-full space-y-4">
      <PostComponent slug={slug} />
    </article>
  );
}
