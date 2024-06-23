import type { Metadata } from "next";
import { getAllCategories } from "@/actions/categoy";
import { Each } from "@/components/ui/Each";
import { getAllPost } from "@/actions/post";
import DFCard from "@/components/card";
import CategoryList from "./components/client";
import PostResult from "./components/result";
import { Suspense } from "react";
import PostSkeleton from "@/components/card/skeleton";

interface CategoryProps {
  searchParams: {
    q?: string;
  };
}

export const metadata: Metadata = {
  title: "Category",
  description: "Find category for movies and dramas",
};

export default async function CategoryPage({
  searchParams: { q },
}: CategoryProps) {
  const categories = await getAllCategories({});
  const posts = q ? await getAllPost({ category: q }) : [];
  return (
    <div className="min-h-screen w-full px-20 py-10">
      <div className="prose dark:prose-invert">
        <h1 className="mb-2">Category</h1>
        <p className="m-0">Find movies and dramas by category</p>
      </div>

      <CategoryList categories={categories} />

      <section id="posts" className="flex min-h-screen w-full justify-center">
        <Suspense fallback={<PostSkeleton total={4} />}>
          <PostResult posts={posts} category={q} />
        </Suspense>
      </section>
    </div>
  );
}
