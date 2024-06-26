import prismadb from "@/config/prisma";
import { PostWithAuthors } from "@/types/post";

export const getPost = async ({
  id,
  slug,
  status = "public",
}: {
  id?: string;
  slug?: string;
  status?: "public" | "pending" | "draft";
}): Promise<PostWithAuthors | null> => {
  const post = await prismadb.post.findFirst({
    where: {
      status,
      OR: [{ id }, { slug }],
    },
    include: {
      categories: true,
      countries: true,
      casts: {
        include: {
          people: true,
        },
      },
    },
  });

  if (!post) return null;

  const postValue: PostWithAuthors = {
    ...post,
    type: post?.type === "drama" ? "drama" : "movie",
  };

  return postValue;
};
