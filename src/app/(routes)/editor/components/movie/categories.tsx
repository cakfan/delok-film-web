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
import { MovieFormValues } from "@/types/post/movie";

interface MovieCategoriesProps {
  form: UseFormReturn<MovieFormValues>;
  initialData: MovieFormValues | null;
  isLoading: boolean;
  categories: Category[];
}

const MovieCategories: FC<MovieCategoriesProps> = ({
  form,
  initialData,
  isLoading,
  categories,
}) => {
  const [movieCategories, setMovieCategories] = useState<
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
              {movieCategories.length > 0 && (
                <div className="flex flex-wrap gap-2 px-3 py-2">
                  <Each
                    of={movieCategories}
                    render={(item) => (
                      <span className="flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-sm">
                        {item.name}
                        <X
                          className="h-4 w-4 cursor-pointer"
                          onClick={() => {
                            const newList = movieCategories.filter(
                              (cat) => item.id !== cat.id,
                            );
                            field.onChange(newList);
                            setMovieCategories(newList);
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
                      !movieCategories.some((cat) => cat.id === item.id),
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
                              ...movieCategories,
                              { id: item.id, name: item.name },
                            ];
                            field.onChange(newList);
                            setMovieCategories(newList);
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

export default MovieCategories;
