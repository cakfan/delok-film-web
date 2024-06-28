import { Post, User } from "@prisma/client";
import { z } from "zod";

export const ReviewSchema = z.object({
  id: z.union([z.string(), z.undefined()]),
  value: z.coerce.number(),
  content: z.string().min(1, { message: "Content must be not empty" }),
  postId: z.union([z.string().nullable(), z.undefined()]),
  userId: z.union([z.string(), z.undefined()]),
  createdAt: z.union([z.date(), z.undefined()]),
  updatedAt: z.union([z.date(), z.undefined()]),
});

export type ReviewFormValues = z.infer<typeof ReviewSchema>;

export interface ReviewWithAuthor extends ReviewFormValues {
  author: User;
}

export interface ReviewWithPost extends ReviewWithAuthor {
  post?: Post | null;
}
