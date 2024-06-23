import Link from "next/link";
import { BrandIcons } from "../icons";
import { cn } from "@/lib/utils";

const SidebarBrand = ({ isSmall }: { isSmall: boolean }) => {
  return (
    <Link
      href="/"
      title="Delok Film"
      className="my-4 flex h-6 items-center px-4 lg:gap-4"
    >
      <BrandIcons.logo className="h-5 w-5 lg:h-6 lg:w-6" />
      <span
        className={cn(
          "hidden text-2xl font-bold opacity-95 lg:inline-block",
          isSmall && "lg:hidden",
        )}
      >
        Delok Film
      </span>
    </Link>
  );
};

export default SidebarBrand;
