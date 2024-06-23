import { Each } from "@/components/ui/Each";
import { MainMobileMenu } from "./config/main";
import MobileLink from "./link";

export default async function MobileNavWrapper() {
  const mainMobileMenu = await MainMobileMenu();
  const items = mainMobileMenu.at(0)?.items;
  return (
    <div className="fixed bottom-0 left-0 flex h-14 w-full items-center border-t backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden">
      <aside className="flex w-full flex-nowrap items-center justify-evenly">
        {items?.length && (
          <Each of={items} render={(item) => <MobileLink item={item} />} />
        )}
      </aside>
    </div>
  );
}
