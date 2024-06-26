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
import { DramaFormValues } from "@/types/post/drama";
import { CountryWithFlag } from "@/types/post/country";

interface DramaCountriesProps {
  form: UseFormReturn<DramaFormValues>;
  initialData: DramaFormValues | null;
  isLoading: boolean;
  countries: CountryWithFlag[];
}

const DramaCountries: FC<DramaCountriesProps> = ({
  form,
  initialData,
  isLoading,
  countries,
}) => {
  const [dramaCountries, setDramaCountries] = useState<CountryWithFlag[]>([]);
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
      setDramaCountries(formattedCountries!);
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
              {dramaCountries.length > 0 && (
                <div className="flex flex-wrap gap-2 px-3 py-2">
                  <Each
                    of={dramaCountries}
                    render={(item) => (
                      <span className="flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-sm">
                        {item.icon}
                        {item.name}
                        <X
                          className="h-4 w-4 cursor-pointer"
                          onClick={() => {
                            const newList = dramaCountries.filter(
                              (cat) => cat.id !== item.id,
                            );
                            field.onChange(newList);
                            setDramaCountries(newList);
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
                      !dramaCountries.some((cat) => cat.id === item.id),
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
                            const newList = [...dramaCountries, item];
                            field.onChange(newList);
                            setDramaCountries(newList);
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

export default DramaCountries;
