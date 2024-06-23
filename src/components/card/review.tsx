"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { format } from "date-fns";
import { ReviewWithAuthor } from "@/types/post/review";
import { Ratings } from "@/components/ui/rating";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AlertModal } from "../alert";
import { deleteReview } from "@/actions/review";
import { enUS } from "date-fns/locale";

interface ReviewCardProps {
  data: ReviewWithAuthor;
  isMine?: boolean;
}

const ReviewCard: FC<ReviewCardProps> = ({ data, isMine = false }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const response = await deleteReview(data.id);
      if (response.status === "error") {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
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
      <div
        className={cn(
          "flex flex-col gap-4 rounded-md bg-muted px-3 py-2",
          isMine && "ring-2 ring-primary/50",
        )}
      >
        <div className="flex items-center gap-4">
          <div className="h-8 w-8">
            <AspectRatio ratio={1 / 1}>
              <Image
                src={data.author.image ?? "NA"}
                alt={data.author.name ?? "NA"}
                fill
                className="m-0 overflow-hidden rounded-full object-cover transition-all duration-300 group-hover:scale-105"
              />
            </AspectRatio>
          </div>
          <div className="prose dark:prose-invert lg:prose-xl">
            <h4 className="m-0">{data.author.name}</h4>
          </div>
          {isMine && (
            <Button
              size="icon"
              variant="ghost"
              title="Delete"
              className="ml-auto rounded-full hover:text-destructive"
              onClick={() => setOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="prose flex flex-col rounded-md dark:prose-invert lg:prose-lg">
          <div className="flex items-center gap-2">
            <Ratings
              rating={data.value}
              variant="yellow"
              iconSize="small"
              disabled
            />
            <span className="text-xs text-foreground/50">
              {format(data.createdAt, "PP", { locale: enUS })}
            </span>
          </div>
          <div
            className="content text-balance"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
