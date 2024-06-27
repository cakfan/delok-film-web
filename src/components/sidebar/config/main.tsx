import { getMe } from "@/actions/user/get-me";
import { SidebarNavItem } from "@/types/nav";
import { Clapperboard, Home, LayoutDashboard, Search } from "lucide-react";

export const MainMenu = async () => {
  const me = await getMe();
  const isNotMember = me?.role !== "member";

  const iconStyle = {
    className: "h-5 w-5 lg:h-6 lg:w-6",
  };

  const dashboard = {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard {...iconStyle} />,
  };

  const menu: SidebarNavItem[] = [
    {
      title: "Main Sidebar",
      hideTitle: true,
      items: [
        {
          title: "Home",
          href: "/",
          icon: <Home {...iconStyle} />,
        },
        {
          title: "Search",
          href: "/search",
          icon: <Search {...iconStyle} />,
        },
        {
          title: "Category",
          href: "/category",
          icon: <Clapperboard {...iconStyle} />,
        },
      ],
    },
  ];

  if (isNotMember) menu[0].items?.splice(1, 0, dashboard);

  return menu;
};
