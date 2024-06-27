import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for was not found",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-10 lg:px-20">
      <div className="flex w-full flex-col items-center md:w-1/3">
        <div className="prose dark:prose-invert lg:prose-2xl">
          <h1>404</h1>
          <p>The page you are looking for could not found</p>
          <Link
            href="/"
            title="Back to Homepage"
            className={cn(
              buttonVariants({ variant: "default" }),
              "flex w-fit gap-4 rounded-full no-underline",
            )}
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
