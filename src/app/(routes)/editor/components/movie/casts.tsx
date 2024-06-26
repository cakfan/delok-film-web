import { UseFormReturn } from "react-hook-form";
import { FC, useState } from "react";
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
import { People } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { MovieFormValues } from "@/types/post/movie";

interface MovieCastsProps {
  form: UseFormReturn<MovieFormValues>;
  initialData: MovieFormValues | null;
  isLoading: boolean;
  peoples: People[];
}

const MovieCasts: FC<MovieCastsProps> = ({
  form,
  initialData,
  isLoading,
  peoples,
}) => {
  const [movieCasts, setMovieCasts] = useState<
    {
      characterName?: string | null;
      peopleId: string;
      people: { name?: string | null; avatar?: string | null };
    }[]
  >(initialData?.casts ?? []);
  const [castSuggestion, setCastSuggestion] = useState<People[]>([]);
  const [selectedPeople, setSelectedPeople] = useState<People | null>(null);
  const [characterName, setCharacterName] = useState("");
  const [openCast, setOpenCast] = useState(false);

  return (
    <FormField
      control={form.control}
      name="casts"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Casts</FormLabel>
          <FormControl>
            <div className="flex flex-col">
              {movieCasts.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                  <Each
                    of={movieCasts}
                    render={(item) => (
                      <div className="flex items-center gap-4 rounded-full bg-accent p-1 text-sm">
                        <div className="w-10">
                          <AspectRatio ratio={1}>
                            <Image
                              src={item.people.avatar ?? "NA"}
                              alt={item.people.name ?? "NA"}
                              fill
                              className="rounded-full object-cover"
                            />
                          </AspectRatio>
                        </div>
                        <div className="flex flex-col">
                          <p className="font-bold text-primary">
                            {item.people?.name}
                          </p>
                          <span className="text-xs">{item.characterName}</span>
                        </div>
                        <X
                          className="mr-2 h-4 w-4 cursor-pointer"
                          onClick={() => {
                            setMovieCasts((prev) => {
                              const newList = prev.filter(
                                (people) => people.peopleId !== item.peopleId,
                              );
                              field.onChange(newList);
                              return newList;
                            });
                          }}
                        />
                      </div>
                    )}
                  />
                </div>
              )}

              <div className="flex gap-8">
                {selectedPeople ? (
                  <div
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "flex w-full gap-4",
                    )}
                  >
                    <div className="flex flex-1 items-center gap-4">
                      <div className="w-10">
                        <AspectRatio ratio={1}>
                          <Image
                            src={selectedPeople.avatar ?? "NA"}
                            alt={selectedPeople.name ?? "NA"}
                            fill
                            className="rounded-full object-cover"
                          />
                        </AspectRatio>
                      </div>
                      {selectedPeople.name}
                    </div>
                    <X
                      className="h-5 w-5 cursor-pointer"
                      onClick={() => {
                        setSelectedPeople(null);
                        setOpenCast(false);
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex w-full flex-col">
                    <Input
                      className="focus-visible:ring-transparent focus-visible:ring-offset-transparent"
                      disabled={isLoading}
                      placeholder="Enter people"
                      onChange={(e) => {
                        const q = e.target.value;
                        const cat = peoples.filter(
                          (item) =>
                            item.name
                              .toLocaleLowerCase()
                              .includes(q.toLocaleLowerCase()) &&
                            !movieCasts.some((cat) => cat.peopleId === item.id),
                        );
                        setCastSuggestion(cat);
                        setOpenCast(q ? true : false);
                      }}
                      onBlur={(e) => {
                        if (selectedPeople) e.target.value = "";
                      }}
                    />
                    {!isLoading && openCast && (
                      <div className="mt-1 flex flex-col rounded-md border border-input bg-background">
                        {castSuggestion.length ? (
                          <Each
                            of={castSuggestion}
                            render={(item) => (
                              <button
                                className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-accent"
                                onClick={() => {
                                  setOpenCast(false);
                                  setSelectedPeople(item);
                                }}
                              >
                                <div className="w-10">
                                  <AspectRatio ratio={1}>
                                    <Image
                                      src={item.avatar ?? "NA"}
                                      alt={item.name ?? "NA"}
                                      fill
                                      className="rounded-full object-cover"
                                    />
                                  </AspectRatio>
                                </div>
                                {item.name}
                              </button>
                            )}
                          />
                        ) : (
                          <span className="px-3 py-2 text-center">
                            No people found
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
                <Input
                  className="focus-visible:ring-transparent focus-visible:ring-offset-transparent"
                  disabled={isLoading}
                  value={characterName}
                  placeholder="Character Name"
                  onChange={(e) => setCharacterName(e.target.value)}
                />
                <Button
                  type="button"
                  variant="secondary"
                  className="rounded-full"
                  onClick={() => {
                    if (!selectedPeople) {
                      toast.error("Please select people");
                    } else {
                      setMovieCasts((prev) => {
                        const newList = [
                          ...prev,
                          {
                            peopleId: selectedPeople?.id!,
                            characterName,
                            people: selectedPeople,
                          },
                        ];
                        field.onChange(newList);
                        return newList;
                      });
                      setSelectedPeople(null);
                      setCharacterName("");
                    }
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MovieCasts;
