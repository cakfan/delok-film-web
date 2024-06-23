import { Review, User } from "@prisma/client";
import { z } from "zod";

export const ReviewSchema = z.object({
  id: z.union([z.string(), z.undefined()]),
  value: z.coerce.number(),
  content: z.string().min(1, { message: "Content must be not empty" }),
  movieId: z.union([z.string().nullable(), z.undefined()]),
  dramaId: z.union([z.string().nullable(), z.undefined()]),
  userId: z.union([z.string(), z.undefined()]),
});

export type ReviewFormValues = z.infer<typeof ReviewSchema>;

export interface ReviewWithAuthor extends Review {
  author: User;
}
