"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Country } from "@prisma/client";
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
import { Loader2, Send, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { countryFlag } from "@/components/icons";
import { CountryFormValues, CountrySchema } from "@/types/post/country";
import { createCountry, deleteCountry, updateCountry } from "@/actions/country";

interface FormCountryProps {
  initialData: Country | null;
}

const FormCountry: React.FC<FormCountryProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const title = initialData ? "Edit Country" : "Add Country";
  const description = initialData ? "Edit a country" : "Add a new country";
  const action = initialData ? "Update" : "Publish";

  const form = useForm<CountryFormValues>({
    mode: "onChange",
    resolver: zodResolver(CountrySchema),
    defaultValues: initialData || {
      name: "",
      slug: "",
    },
  });

  const nameValue = form.watch("name");

  useEffect(() => {
    if (nameValue && !initialData) {
      const slug = generateSlug(nameValue);
      form.setValue("slug", slug);
    }
  });

  const onSubmit = async (data: CountryFormValues) => {
    try {
      setIsLoading(true);
      const response = initialData
        ? await updateCountry(data)
        : await createCountry(data);
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
      const response = await deleteCountry(initialData?.id!);
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
          <div className="my-2 flex flex-wrap items-center justify-center gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Indonesia"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-end gap-4">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading || initialData !== null}
                        placeholder="indonesia"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mb-2">{countryFlag(nameValue)}</div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default FormCountry;
