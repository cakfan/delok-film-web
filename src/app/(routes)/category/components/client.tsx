"use client";

import { FC } from "react";
import { Category } from "@prisma/client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Each } from "@/components/ui/Each";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CategoryListProps {
  categories?: Category[] | null;
}

const CategoryList: FC<CategoryListProps> = ({ categories }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("q", category);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <section
      id="category"
      className="sticky top-0 z-50 w-full bg-background py-4"
    >
      {/* <ScrollArea className="w-full whitespace-nowrap"> */}
      <ToggleGroup
        type="single"
        defaultValue={searchParams.get("q")?.toString()}
        onValueChange={handleCategoryChange}
        className="flex w-full justify-start overflow-scroll"
      >
        {categories?.length && (
          <Each
            of={categories}
            render={(category) => (
              <ToggleGroupItem value={category.slug} className="w-auto">
                {category.name}
              </ToggleGroupItem>
            )}
          />
        )}
      </ToggleGroup>
      {/* </ScrollArea> */}
    </section>
  );
};

export default CategoryList;
