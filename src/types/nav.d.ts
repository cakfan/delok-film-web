import { BrandIcons } from "@/components/icons/brand-icons";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof BrandIcons | React.ReactNode | string;
  label?: string;
  hideTitle?: boolean;
  isProfile?: boolean;
}

export interface NavItemWithChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}
