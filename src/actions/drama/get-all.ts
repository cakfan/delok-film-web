import prismadb from "@/config/prisma";
import { PostWithDramaAndCountries } from "@/types/post/drama";

export const getAllDramas = async (): Promise<
  PostWithDramaAndCountries[] | null
> => {
  const dramas = await prismadb.post.findMany({
    where: {
      type: "drama",
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      drama: {
        include: {
          countries: true,
        },
      },
    },
  });

  return dramas;
};
