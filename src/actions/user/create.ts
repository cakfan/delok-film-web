import prismadb from "@/config/prisma";
// import { createClient } from "@/config/supabase/server";

export const createUser = async () => {
  // const supabase = createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  // const checkUser = await prismadb.user.findUnique({
  //   where: {
  //     email: user?.email,
  //   },
  // });
  // if (!checkUser) {
  //   await prismadb.user.create({
  //     data: {
  //       id: user?.id,
  //       name: user?.user_metadata.name,
  //       email: user?.email!,
  //       image: user?.user_metadata.avatar_url,
  //     },
  //   });
  // }
};
