import prismadb from "@/config/prisma";
import { PostWithDramaDetail } from "@/types/post/drama";
import { toast } from "sonner";

export const getDrama = async ({
  id,
  slug,
}: {
  id?: string;
  slug?: string;
}): Promise<PostWithDramaDetail | null> => {
  if (!id && !slug) {
    const msg = "You have to provide an id or slug";
    toast.error(msg);
    return null;
  }

  const drama = await prismadb.post.findFirst({
    where: {
      OR: [{ id }, { slug }],
    },
    include: {
      authors: true,
      drama: {
        include: {
          categories: true,
          countries: true,
          casts: {
            include: {
              people: true,
            },
          },
        },
      },
    },
  });

  return drama;
};
