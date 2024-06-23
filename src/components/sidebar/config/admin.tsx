import {
  Earth,
  Film,
  Home,
  LayoutDashboard,
  SquareStack,
  UsersRound,
} from "lucide-react";

export const AdminMenu = () => {
  const dashboardUrl = "/dashboard";
  const iconStyle = {
    className: "h-5 w-5 lg:h-6 lg:w-6",
  };
  return [
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
};
