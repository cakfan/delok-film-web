import prismadb from "@/config/prisma";
import { getMe } from "./get-me";
import { redirect } from "next/navigation";

export const isSetup = async ({
  isSetupPage = false,
}: {
  isSetupPage?: boolean;
}) => {
  const me = await getMe();

  if (me) {
    const user = await prismadb.user.findUnique({
      where: {
        id: me.id,
      },
    });

    if (user) {
      if (!isSetupPage && (!user.username || !user.gender)) {
        redirect("/setup");
      }

      if (isSetupPage && user.username && user.role && user.gender) {
        redirect("/");
      }
    }
  }
};
