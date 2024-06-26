import { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { MovieFormValues } from "@/types/post/movie";

interface MovieDatePickerProps {
  form: UseFormReturn<MovieFormValues>;
  isLoading: boolean;
}

const MovieReleaseDate: FC<MovieDatePickerProps> = ({ form, isLoading }) => {
  const [openCalendar, setOpenCalendar] = useState(false);

  return (
    <FormField
      control={form.control}
      name="releaseDate"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Release Date</FormLabel>
          <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  disabled={isLoading}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? (
                    <span>{`${format(field.value, "PPP")}`}</span>
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ?? undefined}
                onSelect={(value) => {
                  setOpenCalendar(false);
                  field.onChange(value);
                }}
                defaultMonth={field.value ?? undefined}
                initialFocus
                captionLayout="dropdown-buttons"
                fromYear={1950}
                toYear={2050}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MovieReleaseDate;
