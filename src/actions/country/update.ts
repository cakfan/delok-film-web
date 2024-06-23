"use server";

import prismadb from "@/config/prisma";
import { CountryFormValues } from "@/types/post/country";
import { getPermission } from "./permission";

export const updateCountry = async (data: CountryFormValues) => {
  try {
    const isAllowed = await getPermission(["admin", "contributor"]);

    if (!isAllowed) {
      return {
        status: "denied",
        message: "You don't have permission",
      };
    }

    const updated = await prismadb.country.update({
      where: { id: data.id },
      data,
    });
    return {
      status: "success",
      message: "Country updated",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};
