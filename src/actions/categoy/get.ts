import prismadb from "@/config/prisma";
import { Category } from "@prisma/client";
import { toast } from "sonner";

export const getCategory = async ({
  id,
  slug,
}: {
  id?: string;
  slug?: string;
}): Promise<Category | null> => {
  if (!id && !slug) {
    const msg = "You have to provide an id or slug";
    toast.error(msg);
    return null;
  }

  const category = await prismadb.category.findFirst({
    where: {
      OR: [{ id }, { slug }],
    },
  });

  return category;
};
