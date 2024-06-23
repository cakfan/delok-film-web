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
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { DramaFormValues } from "@/types/post/drama";
import { DateRange } from "react-day-picker";

interface DramaDatePickerProps {
  form: UseFormReturn<DramaFormValues>;
  isLoading: boolean;
}

const AiredDate: FC<DramaDatePickerProps> = ({ form, isLoading }) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: form.getValues("drama.airedStart") ?? new Date(),
    to: addDays(form.getValues("drama.airedEnd") ?? new Date(), 30),
  });

  return (
    <FormField
      control={form.control}
      name="drama.airedStart"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Aired Date</FormLabel>
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
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                defaultMonth={date?.from ?? undefined}
                selected={date}
                onSelect={(value) => {
                  form.setValue("drama.airedStart", value?.from);
                  form.setValue("drama.airedEnd", value?.to);
                  setDate(value);
                }}
                initialFocus
                numberOfMonths={2}
                min={2}
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

export default AiredDate;
