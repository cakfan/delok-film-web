import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { PostWithAuthors } from "@/types/post";
import { Each } from "@/components/ui/Each";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import CastSkeleton from "./skeleton";

interface DetailCastsProps {
  post: PostWithAuthors;
}

const DetailCast: FC<DetailCastsProps> = ({ post }) => {
  if (!post.casts || !post.casts?.length) {
    return <CastSkeleton />;
  }

  return (
    <section id="casts" className="flex flex-col gap-10 py-10">
      <div className="prose dark:prose-invert lg:prose-xl">
        <h2>Casts</h2>
      </div>
      <div className="flex flex-wrap gap-4 gap-y-8">
        <Each
          of={post.casts}
          render={(item) => (
            <Link
              href={`/people/${item.people.slug}`}
              title={item.people.name ?? "People"}
              className="group flex flex-col items-center justify-center gap-2 rounded-md p-1 text-sm no-underline transition-all duration-300 ease-in-out hover:bg-accent"
            >
              <div className="h-28 w-28">
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src={item.people.avatar || "/img/default.png"}
                    alt={item.people.name || "NA"}
                    fill
                    className="m-0 overflow-hidden rounded-md object-cover transition-all duration-300 group-hover:scale-105"
                  />
                </AspectRatio>
              </div>
              <div className="flex w-28 flex-col overflow-hidden text-ellipsis">
                <span className="line-clamp-1 text-lg font-bold">
                  {item.people?.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.characterName}
                </span>
              </div>
            </Link>
          )}
        />
      </div>
    </section>
  );
};

export default DetailCast;
