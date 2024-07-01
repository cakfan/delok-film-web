"use client";

import React, { FC } from "react";
import { PostWithAuthors } from "@/types/post";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Button } from "../ui/button";
import { Play } from "lucide-react";
import Link from "next/link";
import { BrandIcons } from "../icons";
import TrailerDialog from "../trailer";

interface DramaCardProps {
  post: PostWithAuthors;
  rating: number;
}

const DramaCard: FC<DramaCardProps> = ({ post, rating }) => {
  return (
    <div className="flex h-auto w-full flex-col items-start rounded-md border border-accent">
      <Link
        href={`/p/${post.slug}`}
        title={post.title}
        className="flex w-full flex-col no-underline"
      >
        <div className="relative h-fit w-full overflow-hidden rounded-md">
          <AspectRatio ratio={9 / 16}>
            <Image
              src={post.poster || "/img/default.png"}
              alt={post.title}
              fill
              className="-z-10 m-0 overflow-hidden rounded-md object-cover transition-all duration-300 group-hover:scale-105"
            />
          </AspectRatio>
          <div className="absolute left-0 top-0 z-0 flex h-10 w-full justify-end bg-gradient-to-b from-black">
            <div className="m-1 flex h-fit items-center">
              <span className="line-clamp-1 w-fit text-xs font-bold text-white">
                {rating}
              </span>
              <BrandIcons.star />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 px-2 py-1.5">
          <div className="prose text-center dark:prose-invert">
            <h2 className="line-clamp-1 text-ellipsis">{post.title}</h2>
          </div>
        </div>
      </Link>
      <div className="w-full p-2">
        <TrailerDialog url={post.trailer} title={post.title} />
      </div>
    </div>
  );
};

export default DramaCard;
