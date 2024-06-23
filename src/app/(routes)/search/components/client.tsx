"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchBox = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("searchQuery") as string;
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-background py-4">
      <form onSubmit={handleSearch} className="flex justify-center">
        <div className="flex w-full rounded-full border border-input px-3 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 md:w-1/2">
          <Input
            className="flex-1 border-none outline-none focus-visible:ring-transparent focus-visible:ring-offset-transparent"
            placeholder="Search movies or dramas"
            type="search"
            name="searchQuery"
            autoComplete="off"
            defaultValue={searchParams.get("q")?.toString()}
          />
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="hover:bg-transparent"
          >
            <Search className="h-5 w-5 lg:h-6 lg:w-6" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
