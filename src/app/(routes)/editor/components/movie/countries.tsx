import { UseFormReturn } from "react-hook-form";
import { FC, useEffect, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Each } from "@/components/ui/Each";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { countryFlag } from "@/components/icons";
import { MovieFormValues } from "@/types/post/movie";
import { CountryWithFlag } from "@/types/post/country";

interface MovieCountriesProps {
  form: UseFormReturn<MovieFormValues>;
  initialData: MovieFormValues | null;
  isLoading: boolean;
  countries: CountryWithFlag[];
}

const MovieCountries: FC<MovieCountriesProps> = ({
  form,
  initialData,
  isLoading,
  countries,
}) => {
  const [movieCountries, setMovieCountries] = useState<CountryWithFlag[]>([]);
  const [countriesSuggestion, setCountriesSuggestion] = useState<
    CountryWithFlag[]
  >([]);
  const [openCountries, setOpenCountries] = useState(false);

  useEffect(() => {
    const initialCountries = initialData?.countries;
    if (initialCountries?.length) {
      const formattedCountries = initialCountries.map((item) => ({
        id: item.id,
        name: item.name!,
        icon: countryFlag(item.name!),
      }));
      setMovieCountries(formattedCountries!);
    }
  }, [initialData?.countries]);

  return (
    <FormField
      control={form.control}
      name="countries"
      render={({ field }) => (
        <FormItem className="md:w-[240px]">
          <FormLabel>Countries</FormLabel>
          <FormControl>
            <div className="flex flex-col rounded-md border border-input bg-background text-sm ring-offset-background">
              {movieCountries.length > 0 && (
                <div className="flex flex-wrap gap-2 px-3 py-2">
                  <Each
                    of={movieCountries}
                    render={(item) => (
                      <span className="flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-sm">
                        {item.icon}
                        {item.name}
                        <X
                          className="h-4 w-4 cursor-pointer"
                          onClick={() => {
                            const newList = movieCountries.filter(
                              (cat) => cat.id !== item.id,
                            );
                            field.onChange(newList);
                            setMovieCountries(newList);
                          }}
                        />
                      </span>
                    )}
                  />
                </div>
              )}
              <Input
                className="border-none bg-transparent focus-visible:border-none focus-visible:ring-transparent focus-visible:ring-offset-transparent"
                disabled={isLoading}
                placeholder="Enter country"
                onChange={(e) => {
                  const q = e.target.value;
                  const cat = countries.filter(
                    (item) =>
                      item.name
                        .toLocaleLowerCase()
                        .includes(q.toLocaleLowerCase()) &&
                      !movieCountries.some((cat) => cat.id === item.id),
                  );
                  setCountriesSuggestion(cat);
                  setOpenCountries(q ? true : false);
                }}
                onBlur={(e) => {
                  e.target.value = "";
                }}
              />
              {!isLoading && openCountries && (
                <div className="flex flex-col rounded-md bg-background">
                  {countriesSuggestion.length ? (
                    <Each
                      of={countriesSuggestion}
                      render={(item) => (
                        <span
                          className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-accent"
                          onClick={() => {
                            setOpenCountries(false);
                            const newList = [...movieCountries, item];
                            field.onChange(newList);
                            setMovieCountries(newList);
                          }}
                        >
                          {item.icon}
                          {item.name}
                        </span>
                      )}
                    />
                  ) : (
                    <span className="px-3 py-2 text-center">
                      No country found
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

export default MovieCountries;
