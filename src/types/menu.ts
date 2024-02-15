import { ReactNode } from "react";

// material-ui
import { ChipProps } from "@mui/material";

import { GenericCardProps } from "./root";
import { RealmRoleProps } from "./access";

// ==============================|| MENU TYPES  ||============================== //

export type NavItemType = {
  breadcrumbs?: boolean;
  caption?: ReactNode | string;
  children?: NavItemType[];
  chip?: ChipProps;
  color?: "primary" | "secondary" | "default" | undefined;
  disabled?: boolean;
  external?: boolean;
  icon?: GenericCardProps["iconPrimary"];
  id?: string;
  search?: string;
  target?: boolean;
  title?: ReactNode | string;
  type?: string;
  url?: string | undefined;
  access?: Partial<RealmRoleProps>;
};

export type LinkTarget = "_blank" | "_self" | "_parent" | "_top";

export type MenuProps = {
  openItem: string[];
  openComponent: string;
  drawerOpen: boolean;
  componentDrawerOpen: boolean;
  userInfo: {
    id: number;
    email: string;
    name: string | null;
    username: string;
    active: boolean;
    createdAt: string;
    updatedAt: string | null;
  };
  userAccess: Partial<RealmRoleProps>;
};
