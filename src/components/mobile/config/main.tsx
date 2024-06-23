import { getMe } from "@/actions/user/get-me";
import { SidebarNavItem } from "@/types/nav";
import {
  Clapperboard,
  Home,
  LayoutDashboard,
  Search,
  User,
} from "lucide-react";

export const MainMobileMenu = async () => {
  const user = await getMe();
  const isNotMember = user && user?.role !== "member";

  const iconStyle = {
    className: "h-5 w-5",
  };

  const dashboard = {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard {...iconStyle} />,
  };

  const menu: SidebarNavItem[] = [
    {
      title: "Main Mobile",
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
        {
          title: user ? "Profile" : "Sign In",
          href: user ? `/@${user.username}` : "/signin",
          icon: user ? user.image : <User {...iconStyle} />,
          isProfile: user ? true : false,
        },
      ],
    },
  ];

  // if (isNotMember) menu[0].items?.splice(2, 0, dashboard);

  return menu;
};
