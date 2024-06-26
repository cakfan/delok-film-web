import { z } from "zod";
import { PostBaseSchema } from "./base";
import { User } from "@prisma/client";

export const MovieSchema = PostBaseSchema.extend({
  type: z.literal("movie"),
  producer: z.union([z.string().nullable(), z.undefined()]),
  releaseDate: z.union([z.date().nullable(), z.undefined()]),
});

export type MovieFormValues = z.infer<typeof MovieSchema>;

export type MovieWithAuthor = MovieFormValues & {
  authors?: User[] | null;
};
