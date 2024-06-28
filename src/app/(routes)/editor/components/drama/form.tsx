"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Category, People } from "@prisma/client";
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
import Tiptap from "@/components/tiptap";
import { useEdgeStore } from "@/lib/edgestore";
import { DramaFormValues, DramaSchema } from "@/types/post/drama";
import DramaPoster from "./poster";
import DramaAiredDate from "./aired-date";
import DramaCategories from "./categories";
import DramaCountries from "./countries";
import DramaCasts from "./casts";
import { Switch } from "@/components/ui/switch";
import { CountryWithFlag } from "@/types/post/country";
import { createDrama, deleteDrama, updateDrama } from "@/actions/drama";

interface FormDramaProps {
  initialData: DramaFormValues | null;
  countries: CountryWithFlag[];
  categories: Category[];
  peoples: People[];
}

const FormDrama: React.FC<FormDramaProps> = ({
  initialData,
  categories,
  countries,
  peoples,
}) => {
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { edgestore } = useEdgeStore();
  const router = useRouter();

  const title = initialData ? "Edit Drama" : "Add Drama";
  const description = initialData ? "Edit a drama" : "Add a new drama";
  const action = initialData ? "Update" : "Add";

  const form = useForm<DramaFormValues>({
    mode: "onChange",
    resolver: zodResolver(DramaSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      content: "",
      status: "draft",
      type: "drama",
      nativeTitle: "",
      poster: "",
      director: "",
      trailer: "",
      contentRating: "",
      screenWriter: "",
      network: "",
      airedStart: new Date(),
      airedEnd: new Date(),
      airedOn: "",
      categories: [],
      countries: [],
      casts: [],
    },
  });

  const titleValue = form.watch("title");

  useEffect(() => {
    if (titleValue || !initialData) {
      const slug = generateSlug(titleValue);
      form.setValue("slug", slug);
    }
  });

  const onSubmit = async (data: DramaFormValues) => {
    try {
      const validateData = DramaSchema.parse(data);
      console.log("drama:", validateData);
      setIsLoading(true);

      if (validateData.poster) {
        await edgestore.publicFiles.confirmUpload({
          url: validateData.poster,
        });
      }

      const response = initialData
        ? await updateDrama(validateData)
        : await createDrama(validateData);
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
      const response = await deleteDrama(initialData?.id!);
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
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <div className="sticky top-0 z-20 flex items-center justify-between bg-background py-2">
            <Heading showBackButton title={title} description={description} />
            <div className="flex items-center gap-4">
              {initialData && (
                <Button
                  type="button"
                  disabled={isLoading}
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => setOpen(true)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              )}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="flex h-auto items-center">
                      <div className="flex h-full w-32 items-center space-x-2 px-4">
                        <FormLabel className="text-xs capitalize">
                          {field.value}
                        </FormLabel>
                        <Switch
                          disabled={isLoading}
                          checked={field.value === "public" ? true : false}
                          onCheckedChange={(value) => {
                            field.onChange(value ? "public" : "draft");
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="rounded-full"
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
              <div className="flex w-full flex-wrap gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="Drama title"
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
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading || initialData !== null}
                          placeholder="drama-slug"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full flex-col gap-8">
                <div className="flex w-full">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Tiptap
                            placeholder="content"
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
                <DramaCasts
                  initialData={initialData}
                  form={form}
                  isLoading={isLoading}
                  peoples={peoples}
                />
              </div>
            </div>
            <div className="flex w-1/3 flex-col items-center gap-8">
              <DramaPoster
                form={form}
                isLoading={isLoading}
                edgestore={edgestore}
              />
              <FormField
                control={form.control}
                name="alsoKnownAs"
                render={({ field }) => (
                  <FormItem className="md:w-[240px]">
                    <FormLabel>Also known as</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Nigeru wa"
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
                name="nativeTitle"
                render={({ field }) => (
                  <FormItem className="md:w-[240px]">
                    <FormLabel>Native Title</FormLabel>
                    <FormControl>
                      <Input
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
                name="seasons"
                render={({ field }) => (
                  <FormItem className="md:w-[240px]">
                    <FormLabel>Seasons</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Seasons"
                        {...field}
                        value={field.value ?? undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="director"
                render={({ field }) => (
                  <FormItem className="md:w-[240px]">
                    <FormLabel>Director</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Director"
                        {...field}
                        value={field.value ?? undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="screenWriter"
                render={({ field }) => (
                  <FormItem className="md:w-[240px]">
                    <FormLabel>Screen Writer</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Screen Writer"
                        {...field}
                        value={field.value ?? undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="episodes"
                render={({ field }) => (
                  <FormItem className="md:w-[240px]">
                    <FormLabel>Episodes</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="11"
                        {...field}
                        type="number"
                        value={field.value ?? undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contentRating"
                render={({ field }) => (
                  <FormItem className="md:w-[240px]">
                    <FormLabel>Content Rating</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Content Rating"
                        {...field}
                        value={field.value ?? undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trailer"
                render={({ field }) => (
                  <FormItem className="md:w-[240px]">
                    <FormLabel>Trailer</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Youtube URL"
                        {...field}
                        value={field.value ?? undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="network"
                render={({ field }) => (
                  <FormItem className="md:w-[240px]">
                    <FormLabel>Network</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Fuji TV"
                        {...field}
                        value={field.value ?? undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="airedOn"
                render={({ field }) => (
                  <FormItem className="md:w-[240px]">
                    <FormLabel>Aired on</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Sunday"
                        {...field}
                        value={field.value ?? undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DramaAiredDate form={form} isLoading={isLoading} />
              <DramaCategories
                form={form}
                initialData={initialData}
                isLoading={isLoading}
                categories={categories}
              />
              <DramaCountries
                form={form}
                initialData={initialData}
                isLoading={isLoading}
                countries={countries}
              />
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default FormDrama;
