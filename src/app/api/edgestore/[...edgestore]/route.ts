import { getMe } from "@/actions/user";
import { initEdgeStore } from "@edgestore/server";
import {
  CreateContextOptions,
  createEdgeStoreNextHandler,
} from "@edgestore/server/adapters/next/app";
import { redirect } from "next/navigation";
import { z } from "zod";

type Context = {
  userId: string;
  role: "admin" | "contributor" | "member";
};

async function createContext({ req }: CreateContextOptions): Promise<Context> {
  const session = await getMe();
  if (!session) {
    redirect("/signin");
  }
  return {
    userId: session?.id ?? "anonim",
    role: session?.role ?? "member",
  };
}

const es = initEdgeStore.context<Context>().create();
/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es
    .imageBucket({ maxSize: 1024 * 1024 * 1 })
    .input(
      z.object({
        type: z.enum(["post", "profile"]),
      }),
    )
    .path(({ input }) => [{ type: input.type }]),
  protectedFiles: es
    .imageBucket({ maxSize: 1024 * 1024 * 1 })
    .path(({ ctx }) => [{ owner: ctx.userId }])
    .accessControl({
      OR: [
        { userId: { path: "owner" } },
        { role: { in: ["admin", "contributor"] } },
      ],
    }),
});
const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  createContext,
});
export { handler as GET, handler as POST };
/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;
