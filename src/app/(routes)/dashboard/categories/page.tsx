import type { Metadata } from "next";
import { getAllCategories } from "@/actions/categoy/get-all";
import { ClientColumn } from "./components/columns";
import CategoryClient from "./components/client";

export const metadata: Metadata = {
  title: "Categories",
  description: "Manage categories for this website",
};

export default async function CategoriesPage() {
  const categories = await getAllCategories({
    sortBy: "update",
    sortOrder: "desc",
  });

  let formatted: ClientColumn[] = [];
  if (categories?.length) {
    formatted = categories.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
    }));
  }
  return <CategoryClient data={formatted} />;
}
