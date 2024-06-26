"use client";

import { FC, useEffect, useOptimistic, useState } from "react";
import { User } from "@prisma/client";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Ratings } from "@/components/ui/rating";
import { useForm } from "react-hook-form";
import {
  ReviewFormValues,
  ReviewSchema,
  ReviewWithAuthor,
} from "@/types/post/review";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button, buttonVariants } from "@/components/ui/button";
import Tiptap from "@/components/tiptap";
import { createReview } from "@/actions/review";
import { useRouter } from "next/navigation";
import ReviewCard from "@/components/card/review";
import Link from "next/link";
import ReviewSkeleton from "./skeleton";
import { cn } from "@/lib/utils";

interface ReviewFormProps {
  id: string;
  me: User | null;
  myReview: ReviewWithAuthor | null;
}

const ReviewForm: FC<ReviewFormProps> = ({ id, me, myReview }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [optimisticMyReview, addOptimisticMyReview] = useOptimistic(
    myReview,
    (_state, newReview: ReviewWithAuthor) => {
      return newReview;
    },
  );
  const router = useRouter();

  let defaultValues = {
    value: 1,
    content: "",
    postId: id,
  };

  const form = useForm<ReviewFormValues>({
    mode: "onChange",
    resolver: zodResolver(ReviewSchema),
    defaultValues,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (data: ReviewFormValues) => {
    try {
      setIsLoading(true);
      const validateData = ReviewSchema.parse(data);
      console.log("data:", validateData);
      addOptimisticMyReview({
        ...validateData,
        userId: me?.id,
        author: me!,
        postId: id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const response = await createReview(validateData);
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      form.reset(defaultValues);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return <ReviewSkeleton />;
  }

  if (optimisticMyReview) {
    return (
      <div className="mt-8">
        <ReviewCard isMine data={optimisticMyReview} />
      </div>
    );
  }

  if (me) {
    return (
      <Form {...form}>
        <form
          action={async () => {
            const valid = await form.trigger();
            if (valid) onSubmit(form.getValues());
          }}
          className="review-form mt-8 flex flex-col gap-4 border-t border-accent pt-8"
        >
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Ratings
                    rating={field.value}
                    variant="yellow"
                    onRatingChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Tiptap
                    placeholder="Type your review"
                    disabled={isLoading}
                    content={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
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
              Submit
            </Button>
          </div>
        </form>
      </Form>
    );
  }

  return (
    <div className="mt-8 w-full rounded-md p-4 ring-2 ring-primary/50">
      <div className="prose flex items-center justify-between dark:prose-invert lg:prose-xl">
        <p>You have to login to create a review</p>
        <Link
          href="/signin"
          title="Sign In"
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "rounded-full no-underline",
          )}
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default ReviewForm;
