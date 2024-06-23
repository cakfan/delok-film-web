"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Country, People } from "@prisma/client";
import { AlertModal } from "@/components/alert";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateSlug } from "../../utils/slug";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  Loader2,
  Send,
  Trash,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import Tiptap from "../../../../../components/tiptap";
import { getAge } from "@/actions/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useEdgeStore } from "@/lib/edgestore";
import { Calendar } from "@/components/ui/calendar";
import { SingleImageDropzone } from "@/components/ui/single-image-upload";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Each } from "@/components/ui/Each";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Progress } from "@/components/ui/progress";
import { PeopleFormValues, PeopleSchema } from "@/types/post/people";
import { createPeople, deletePeople, updatePeople } from "@/actions/people";

interface FormPeopleProps {
  initialData: (People & { nationality?: Country | null }) | null;
  countries: {
    id: string;
    name: string;
    icon: React.ReactNode;
  }[];
}

const FormPeople: React.FC<FormPeopleProps> = ({ initialData, countries }) => {
  const [open, setOpen] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { edgestore } = useEdgeStore();
  const router = useRouter();

  const title = initialData ? "Edit People" : "Add People";
  const description = initialData ? "Edit a people" : "Add a new people";
  const action = initialData ? "Update" : "Publish";

  const form = useForm<PeopleFormValues>({
    mode: "onChange",
    resolver: zodResolver(PeopleSchema),
    defaultValues: initialData || {
      name: "",
      slug: "",
      gender: "",
      avatar: "",
      birthDate: new Date(2000, 1, 1),
      nativeName: "",
      countryId: "",
    },
  });

  const nameValue = form.watch("name");

  useEffect(() => {
    if (nameValue || !initialData) {
      const slug = generateSlug(nameValue);
      form.setValue("slug", slug);
    }
  });

  const onSubmit = async (data: PeopleFormValues) => {
    const validateData = PeopleSchema.parse(data);
    try {
      setIsLoading(true);

      if (validateData.avatar) {
        await edgestore.publicFiles.confirmUpload({ url: validateData.avatar });
      }

      const response = initialData
        ? await updatePeople(validateData)
        : await createPeople(validateData);
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      router.back();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const response = await deletePeople(initialData?.id!);
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      router.back();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(onSubmit)}
          action={async () => {
            const valid = await form.trigger();
            if (valid) onSubmit(form.getValues());
          }}
          className="w-full space-y-4"
        >
          <div className="sticky z-20 flex items-center justify-between bg-background pb-2">
            <Heading showBackButton title={title} description={description} />
            <div className="flex items-center gap-8">
              {initialData && (
                <Button
                  type="button"
                  disabled={isLoading}
                  variant="destructive"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setOpen(true)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              )}
              <Button
                disabled={isLoading}
                className="ml-auto rounded-full"
                type="submit"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                {action}
              </Button>
            </div>
          </div>
          <Separator />
          <div className="flex w-full flex-wrap justify-center gap-8 py-10">
            <div className="flex flex-1 flex-col gap-8">
              <div className="flex flex-wrap gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="Yui Aragaki"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[240px]">
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading || initialData !== null}
                          placeholder="yui-aragaki"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Tiptap
                          placeholder="Bio"
                          disabled={isLoading}
                          content={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex w-1/3 flex-col items-center gap-8">
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <SingleImageDropzone
                          width={200}
                          height={200}
                          value={field.value || ""}
                          dropzoneOptions={{
                            maxSize: 1024 * 1024 * 1,
                          }}
                          onChange={async (file) => {
                            if (file) {
                              // setFile(file);
                              const res = await edgestore.publicFiles.upload({
                                file,
                                input: { type: "post" },
                                options: { temporary: true },
                                onProgressChange: (progress) => {
                                  // you can use this to show a progress bar
                                  setUploadProgress(progress);
                                },
                              });
                              // you can run some server action or api here
                              // to add the necessary data to your database
                              field.onChange(res.url);
                              setUploadProgress(0);
                            } else {
                              field.onChange();
                            }
                          }}
                          disabled={isLoading}
                        />
                        {uploadProgress > 0 && (
                          <Progress value={uploadProgress} className="h-2" />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nativeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Native Name</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[240px]"
                        disabled={isLoading}
                        placeholder="新垣結衣"
                        {...field}
                        value={field.value || "" || undefined}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              <span>
                                {`${format(
                                  field.value,
                                  "PPP",
                                )} (${getAge(field.value)})`}
                              </span>
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
                          disabled={(date) =>
                            date > new Date() || date < new Date("1950-01-01")
                          }
                          initialFocus
                          captionLayout="dropdown-buttons"
                          fromYear={1950}
                          toYear={new Date().getFullYear()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="countryId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Nationality</FormLabel>
                    <Popover open={openCountry} onOpenChange={setOpenCountry}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[240px] justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <div className="flex items-center gap-4">
                              {field.value &&
                                countries.find(
                                  (country) => country.id === field.value,
                                )?.icon}
                              {field.value
                                ? countries.find(
                                    (country) => country.id === field.value,
                                  )?.name
                                : "Select country"}
                            </div>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="h-auto max-h-[200px] w-[240px] p-0">
                        <Command>
                          <CommandInput placeholder="Search country..." />
                          <CommandEmpty>No country found.</CommandEmpty>
                          <CommandList>
                            <CommandGroup>
                              <Each
                                of={countries}
                                render={(item) => (
                                  <CommandItem
                                    className="flex"
                                    value={item.name}
                                    onSelect={() => {
                                      setOpenCountry(false);
                                      field.onChange(item.id);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        item.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    {item.icon}
                                    <span className="ml-2">{item.name}</span>
                                  </CommandItem>
                                )}
                              />
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="w-full space-y-3 md:w-[240px]">
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <ToggleGroup
                        type="single"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex w-full justify-start text-xs"
                      >
                        <FormItem>
                          <FormControl>
                            <ToggleGroupItem
                              value="male"
                              aria-label="Toggle male"
                              className="rounded-full"
                            >
                              Male
                            </ToggleGroupItem>
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormControl>
                            <ToggleGroupItem
                              value="female"
                              aria-label="Toggle female"
                              className="rounded-full"
                            >
                              Female
                            </ToggleGroupItem>
                          </FormControl>
                        </FormItem>
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default FormPeople;
