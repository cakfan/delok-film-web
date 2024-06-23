import NextAuth from "next-auth";

import authConfig from "./config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prismadb from "@/config/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prismadb),
  callbacks: {
    async session({ session }: any) {
      const users = await prismadb.user.findUnique({
        where: {
          email: session.user.email!,
        },
      });
      session.user.id = users?.id;
      session.user.name = users?.name;
      session.user.gender = users?.gender;
      session.user.username = users?.username;
      session.user.image = users?.image;
      session.user.role = users?.role;

      return session;
    },
  },
  session: { strategy: "jwt" },
  debug: false,
});
