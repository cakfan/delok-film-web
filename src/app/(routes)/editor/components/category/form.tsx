"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";
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
import { Loader2, Send, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/alert";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { CategoryFormValues, CategorySchema } from "@/types/post/category";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/actions/categoy";

interface FormCategoryProps {
  initialData: Category | null;
}

const FormCategory: React.FC<FormCategoryProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const title = initialData ? "Edit Category" : "Add Category";
  const description = initialData ? "Edit a category" : "Add a new category";
  const action = initialData ? "Update" : "Publish";

  const form = useForm<CategoryFormValues>({
    mode: "onChange",
    resolver: zodResolver(CategorySchema),
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

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setIsLoading(true);
      const response = initialData
        ? await updateCategory(data)
        : await createCategory(data);
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
      const response = await deleteCategory(initialData?.id!);
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
                      placeholder="Comedy"
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
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading || initialData !== null}
                      placeholder="comedy"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default FormCategory;
