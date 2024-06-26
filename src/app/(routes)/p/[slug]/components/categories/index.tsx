import { FC } from "react";
import Link from "next/link";
import { Each } from "@/components/ui/Each";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PostWithAuthors } from "@/types/post";

interface CategoriesProps {
  post: PostWithAuthors;
}

const CategoriesItems: FC<CategoriesProps> = ({ post }) => {
  if (!post?.categories || !post.categories.length) return null;
  return (
    <Each
      of={post.categories}
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
  );
};

export default CategoriesItems;
