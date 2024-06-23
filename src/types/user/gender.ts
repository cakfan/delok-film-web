import { z } from "zod";

export const GenderSchema = z.string().refine(
  (val) => {
    return val === "male" || val === "female";
  },
  {
    message: "Gender must be either 'male' or 'female'",
  },
);

export type GenderValues = z.infer<typeof GenderSchema>;
