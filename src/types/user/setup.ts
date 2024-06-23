import { z } from "zod";
import { GenderSchema } from "./gender";

export const SetupSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must at least 4 character" }),
  gender: GenderSchema,
});

export type SetupFormValues = z.infer<typeof SetupSchema>;
