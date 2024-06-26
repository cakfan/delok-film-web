import { z } from "zod";
import { PostBaseSchema } from "./base";
import { User } from "@prisma/client";

export const DramaSchema = PostBaseSchema.extend({
  type: z.literal("drama"),
  episodes: z.union([z.coerce.number().nullable(), z.undefined()]),
  network: z.union([z.string().nullable(), z.undefined()]),
  airedStart: z.union([z.date().nullable(), z.undefined()]),
  airedEnd: z.union([z.date().nullable(), z.undefined()]),
  airedOn: z.union([z.string().nullable(), z.undefined()]),
});

export type DramaFormValues = z.infer<typeof DramaSchema>;

export type DramaWithAuthor = DramaFormValues & {
  authors?: User[] | null;
};
