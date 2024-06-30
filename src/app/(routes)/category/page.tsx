import type { Metadata } from "next";
import { getAllCategories, getCategory } from "@/actions/categoy";
import { getAllPost } from "@/actions/post";
import CategoryList from "./components/client";
import PostResult from "./components/result";
import { Suspense } from "react";
import PostSkeleton from "@/components/card/skeleton";

interface CategoryProps {
  searchParams: {
    q?: string;
  };
}

export const generateMetadata = async ({
  searchParams: { q },
}: CategoryProps): Promise<Metadata> => {
  const category = await getCategory({ slug: q });
  return {
    title: category ? category.name : "Category",
    description: "Find category for movies and dramas",
  };
};

export default async function CategoryPage({
  searchParams: { q },
}: CategoryProps) {
  const categories = await getAllCategories({});
  return (
    <div className="min-h-screen w-screen px-10 py-5 lg:px-20 lg:py-10">
      <div className="prose dark:prose-invert">
        <h1 className="mb-2">Category</h1>
        <p className="m-0">Find movies and dramas by category</p>
      </div>

      <CategoryList categories={categories} />

      <section id="posts" className="flex min-h-screen w-full justify-center">
        <Suspense fallback={<PostSkeleton total={4} />}>
          <PostResult category={q} />
        </Suspense>
      </section>
    </div>
  );
}
