import { FC } from "react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { PostWithAuthors } from "@/types/post";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import TrailerDialog from "@/components/trailer";
import CountriesItems from "../countries";
import ShareButton from "../share";

interface MoreInfoProps {
  post: PostWithAuthors;
}

const MoreInfo: FC<MoreInfoProps> = ({ post }) => {
  const isMovie = post.type === "movie";

  const airedRange =
    !isMovie && post.airedStart && post.airedEnd
      ? `${format(post.airedStart, "PP", { locale: enUS })} - ${format(post.airedEnd, "PP", { locale: enUS })}`
      : "NA";
  return (
    <>
      <div className="relative mb-4 w-full overflow-hidden rounded-md">
        <AspectRatio ratio={9 / 16}>
          <Image
            src={post.poster || "/img/default.png"}
            alt={post.title}
            fill
            className="m-0 overflow-hidden rounded-md object-cover transition-all duration-300 group-hover:scale-105"
          />
        </AspectRatio>
      </div>
      <TrailerDialog title={post.title} url={post.trailer} />
      <ShareButton post={post} />
      <div className="detail prose mt-10 flex w-full flex-col gap-2 rounded-md border border-input px-3 py-2 ring-offset-background dark:prose-invert">
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
          <span className="font-bold">Seasons: </span> {post.seasons ?? "-"}
        </div>
        <div className="w-full">
          <span className="font-bold">Director: </span> {post.director ?? "-"}
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
    </>
  );
};

export default MoreInfo;
