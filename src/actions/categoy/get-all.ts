import prismadb from "@/config/prisma";
import { Category } from "@prisma/client";

interface CategoryProps {
  sortBy?: "update" | "name";
  sortOrder?: "asc" | "desc";
}

export const getAllCategories = async ({
  sortBy = "name",
  sortOrder = "asc",
}: CategoryProps): Promise<Category[] | null> => {
  const orderBy = {
    update: { updatedAt: sortOrder },
    name: { name: sortOrder },
  };

  const categories = await prismadb.category.findMany({
    orderBy: orderBy[sortBy],
  });

  return categories;
};
