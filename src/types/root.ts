import { ComponentClass, FunctionComponent } from 'react';

// material-ui
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

// types
import { AuthProps } from './auth';
import { MenuProps } from './menu';
import { SnackbarProps } from './snackbar';
import { ModalProps } from './modal';

// ==============================|| ROOT TYPES  ||============================== //

export type RootStateProps = {
  auth: AuthProps;
  menu: MenuProps;
  snackbar: SnackbarProps;
  modal: ModalProps;
};

export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};

export type OverrideIcon =
  | (OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  })
  | ComponentClass<any>
  | FunctionComponent<any>;

export interface GenericCardProps {
  title?: string;
  primary?: string | number | undefined;
  secondary?: string;
  content?: string;
  image?: string;
  dateTime?: string;
  iconPrimary?: OverrideIcon;
  color?: string;
  size?: string;
}

interface Pagination {
  currentPage: number, lastPage: number, perPage: number, total: number
}

export interface Res<T> {
  status: boolean;
  data: { items: T, pagination: Pagination };
  message: string;
}

export interface ResDetail<T> {
  status: boolean;
  data: T;
  message: string;
}

export interface ResList<T> {
  items: T,
  pagination: Pagination
}
export interface Query {
  page?: number,
  perPage?: number,
  searchKey?: string,
  isAgent?: string,
  sortType?: string,
}

export type FileSchema = {
  id: string;
  type: string;
  downloadUrl: string;
  thumbnails: any;
};

