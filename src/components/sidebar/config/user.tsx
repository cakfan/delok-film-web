import { getMe } from "@/actions/user/get-me";
import { SidebarNavItem } from "@/types/nav";
import { Palette, User } from "lucide-react";

export const UserMenu = async () => {
  const user = await getMe();

  const iconStyle = {
    className: "h-5 w-5 lg:h-6 lg:w-6",
  };

  const menu: SidebarNavItem[] = [
    {
      title: "User Sidebar",
      hideTitle: true,
      items: [
        {
          title: "Theme",
          href: "#theme",
          icon: <Palette {...iconStyle} />,
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

  return menu;
};
