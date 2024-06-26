import { z } from "zod";
import { DramaSchema } from "./drama";
import { MovieSchema } from "./movie";
import { User } from "@prisma/client";

export const PostSchema = z.union([MovieSchema, DramaSchema]);

export type PostFormValues = z.infer<typeof PostSchema>;

export type PostWithAuthors = PostFormValues & {
  createdAt: Date;
  updatedAt: Date;
  authors?: User[] | null;
};
