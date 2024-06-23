import type { Metadata } from "next";
// import { BrandIcons } from "@/components/icons";
// import { createClient } from "@/config/supabase/server";
// import { headers } from "next/headers";
// import { redirect } from "next/navigation";
// import { Button } from "@/components/ui/button";
import SignInForm from "./components/sigin-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 p-5 font-sans">
      <div className="flex w-full flex-col gap-4 md:w-fit">
        <div className="prose dark:prose-invert">
          <h1 className="mb-0">Sign In</h1>
          <p>You have to sign in to access cool features</p>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}
