"use client";

import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";
import { Button } from "./button";

interface HeadingProps {
  title: string;
  description: string;
  showBackButton?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  showBackButton = false,
}) => {
  const router = useRouter();
  return (
    <div className="flex items-start space-x-4">
      {showBackButton && (
        <Button
          onClick={() => router.back()}
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      )}
      <div className="flex-col">
        <h2 className="font-sans text-3xl font-bold tracking-tight">{title}</h2>
        <p className="font-sans text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
