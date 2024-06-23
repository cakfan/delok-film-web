import prismadb from "@/config/prisma";
import { Category } from "@prisma/client";

export const getCategory = async ({
  id,
  slug,
}: {
  id?: string;
  slug?: string;
}): Promise<Category | null> => {
  if (!id && !slug) {
    return null;
  }

  const category = await prismadb.category.findFirst({
    where: {
      OR: [{ id }, { slug }],
    },
  });

  return category;
};
