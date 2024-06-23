import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import { ThemeProvider } from "./theme";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { getMe } from "@/actions/user";
import NextAuthProvider from "./auth";

export default async function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const me = await getMe();
  return (
    <NextAuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <NextTopLoader
          easing="ease"
          showSpinner={false}
          color="hsl(var(--primary))"
        />
        {me ? (
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        ) : (
          <>{children}</>
        )}
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </NextAuthProvider>
  );
}
