import { getMe } from "@/actions/user";
import { SidebarNavItem } from "@/types/nav";
import {
  Earth,
  Film,
  Home,
  LayoutDashboard,
  SquareStack,
  UsersRound,
  MessageSquareDot,
  BookUser,
} from "lucide-react";

export const AdminMenu = async () => {
  const me = await getMe();
  const isAdmin = me?.role === "admin";

  const dashboardUrl = "/dashboard";
  const iconStyle = {
    className: "h-5 w-5 lg:h-6 lg:w-6",
  };

  const reviews = {
    title: "Reviews",
    href: dashboardUrl + "/reviews",
    icon: <MessageSquareDot {...iconStyle} />,
  };

  const users = {
    title: "Users",
    href: dashboardUrl + "/users",
    icon: <BookUser {...iconStyle} />,
  };

  const menu: SidebarNavItem[] = [
    {
      title: "Admin Sidebar",
      hideTitle: true,
      items: [
        {
          title: "Home",
          href: "/",
          icon: <Home {...iconStyle} />,
        },
        {
          title: "Dashboard",
          href: dashboardUrl,
          icon: <LayoutDashboard {...iconStyle} />,
        },
        {
          title: "Posts",
          href: dashboardUrl + "/posts",
          icon: <Film {...iconStyle} />,
        },
        {
          title: "Countries",
          href: dashboardUrl + "/countries",
          icon: <Earth {...iconStyle} />,
        },
        {
          title: "Categories",
          href: dashboardUrl + "/categories",
          icon: <SquareStack {...iconStyle} />,
        },
        {
          title: "Peoples",
          href: dashboardUrl + "/peoples",
          icon: <UsersRound {...iconStyle} />,
        },
      ],
    },
  ];

  if (isAdmin) {
    menu[0].items?.push(reviews);
    menu[0].items?.push(users);
  }

  return menu;
};
