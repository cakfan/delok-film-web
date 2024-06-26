import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FC, useState } from "react";
import { Category } from "@prisma/client";
import { Each } from "@/components/ui/Each";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DramaFormValues } from "@/types/post/drama";

interface DramaCategoriesProps {
  form: UseFormReturn<DramaFormValues>;
  initialData: DramaFormValues | null;
  isLoading: boolean;
  categories: Category[];
}

const DramaCategories: FC<DramaCategoriesProps> = ({
  form,
  initialData,
  isLoading,
  categories,
}) => {
  const [dramaCategories, setDramaCategories] = useState<
    { id?: string | null; name?: string | null }[]
  >(initialData?.categories ?? []);
  const [categoriesSuggestion, setCategoriesSuggestion] = useState<Category[]>(
    [],
  );
  const [openCategories, setOpenCategories] = useState(false);

  return (
    <FormField
      control={form.control}
      name="categories"
      render={({ field }) => (
        <FormItem className="md:w-[240px]">
          <FormLabel>Categories</FormLabel>
          <FormControl>
            <div className="flex flex-col rounded-md border border-input bg-background text-sm ring-offset-background">
              {dramaCategories.length > 0 && (
                <div className="flex flex-wrap gap-2 px-3 py-2">
                  <Each
                    of={dramaCategories}
                    render={(item) => (
                      <span className="flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-sm">
                        {item.name}
                        <X
                          className="h-4 w-4 cursor-pointer"
                          onClick={() => {
                            const newList = dramaCategories.filter(
                              (cat) => cat.id !== item.id,
                            );
                            field.onChange(newList);
                            setDramaCategories(newList);
                          }}
                        />
                      </span>
                    )}
                  />
                </div>
              )}
              <Input
                className="border-none bg-transparent focus-visible:border-none focus-visible:ring-transparent focus-visible:ring-offset-transparent"
                placeholder="Enter category"
                disabled={isLoading}
                onChange={(e) => {
                  const q = e.target.value;
                  const cat = categories.filter(
                    (item) =>
                      item.name
                        .toLocaleLowerCase()
                        .includes(q.toLocaleLowerCase()) &&
                      !dramaCategories.some((cat) => cat.id === item.id),
                  );
                  setCategoriesSuggestion(cat);
                  setOpenCategories(q ? true : false);
                }}
                onBlur={(e) => {
                  e.target.value = "";
                }}
              />
              {!isLoading && openCategories && (
                <div className="flex flex-col rounded-md bg-background">
                  {categoriesSuggestion.length ? (
                    <Each
                      of={categoriesSuggestion}
                      render={(item) => (
                        <span
                          className="cursor-pointer px-3 py-2 hover:bg-accent"
                          onClick={() => {
                            setOpenCategories(false);
                            const newList = [
                              ...dramaCategories,
                              { id: item.id, name: item.name },
                            ];
                            field.onChange(newList);
                            setDramaCategories(newList);
                          }}
                        >
                          {item.name}
                        </span>
                      )}
                    />
                  ) : (
                    <span className="px-3 py-2 text-center">
                      No category found
                    </span>
                  )}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DramaCategories;
