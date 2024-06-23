"use server";

import prismadb from "@/config/prisma";
import { getPermission } from "./permission";

export const deleteCountry = async (id: string) => {
  try {
    const isAllowed = await getPermission(["admin"]);

    if (!isAllowed) {
      return {
        status: "denied",
        message: "You don't have permission",
      };
    }
    const deleted = await prismadb.country.delete({
      where: { id },
    });
    return {
      status: "success",
      message: "Country deleted",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};
