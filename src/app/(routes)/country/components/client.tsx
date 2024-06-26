"use client";

import { FC } from "react";
import { Country } from "@prisma/client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Each } from "@/components/ui/Each";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { countryFlag } from "@/components/icons";

interface CountryListProps {
  countries?: Country[] | null;
}

const CountryList: FC<CountryListProps> = ({ countries }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleCategoryChange = (country: string) => {
    const params = new URLSearchParams(searchParams);
    if (country) {
      params.set("q", country);
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
      <ToggleGroup
        type="single"
        defaultValue={searchParams.get("q")?.toString()}
        onValueChange={handleCategoryChange}
        className="flex w-full justify-start overscroll-auto"
      >
        {countries?.length && (
          <Each
            of={countries}
            render={(country) => (
              <ToggleGroupItem
                value={country.slug}
                className="flex items-center gap-2"
              >
                {countryFlag(country.name)}
                {country.name}
              </ToggleGroupItem>
            )}
          />
        )}
      </ToggleGroup>
    </section>
  );
};

export default CountryList;
