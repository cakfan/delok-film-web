"use server";

import { SetupFormValues } from "@/types/user/setup";
import { checkUsername } from "./check-username";
import prismadb from "@/config/prisma";
import { getMe } from "./get-me";
import { Gender } from "@prisma/client";

export const setupUser = async (data: SetupFormValues) => {
  try {
    const me = await getMe();
    const isUsernameExist = await checkUsername(data.username);

    if (!me) {
      return {
        status: "error",
        message: "You have to login",
      };
    }

    if (isUsernameExist) {
      return {
        status: "error",
        message: "Username is taken",
      };
    }

    const user = await prismadb.user.update({
      where: {
        id: me.id,
      },
      data: {
        username: data.username,
        gender: data.gender as Gender,
      },
    });

    return {
      status: "success",
      message: "User updated",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};
