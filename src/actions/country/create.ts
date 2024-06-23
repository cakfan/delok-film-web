"use server";

import prismadb from "@/config/prisma";
import { CountryFormValues } from "@/types/post/country";
import { getPermission } from "./permission";

export const createCountry = async (data: CountryFormValues) => {
  try {
    const isAllowed = await getPermission(["admin", "contributor"]);

    if (!isAllowed) {
      return {
        status: "denied",
        message: "You don't have permission",
      };
    }

    const created = await prismadb.country.create({
      data,
    });
    return {
      status: "success",
      message: "Country created",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};
