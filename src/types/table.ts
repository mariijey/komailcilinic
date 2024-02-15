//mui
import { TableCellProps } from "@mui/material";
//react-table
import { HeaderGroup, Column, Row } from "react-table";
//types
import { KeyedObject } from "./root";
import { RealmRoleProps } from "./access";

export type ArrangementOrder = "asc" | "desc" | undefined;

export type GetComparator = (
  o: ArrangementOrder,
  o1: string
) => (a: KeyedObject, b: KeyedObject) => number;

export interface EnhancedTableHeadProps extends TableCellProps {
  onSelectAllClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  order: ArrangementOrder;
  orderBy?: string;
  numSelected: number;
  rowCount: number;
  onRequestSort: (e: React.SyntheticEvent, p: string) => void;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
}

export interface HeadCell {
  id: string;
  numeric: boolean;
  label: string;
  disablePadding?: string | boolean | undefined;
  align?: "left" | "right" | "inherit" | "center" | "justify" | undefined;
}

export interface ActionObj {
  id: number | string;
  title: string;
  isDisable?: (row?: unknown) => boolean;
  hasLink?: boolean;
  hasBlank?: boolean;
  navigateLink?: any;
  access?: Partial<RealmRoleProps>;
  handleClick?: (row?: unknown) => void;
}

export interface ActionProps {
  actionList?: ActionObj[];
  row: Row<{ id: string }>;
}
export interface HeaderSortProps {
  column: any;
  sort?: boolean;
}
export interface HeaderProps {
  headerGroups: HeaderGroup<object>[];
  columnAlign?: "center" | "inherit" | "left" | "right" | "justify" | undefined;
  hasAction: boolean;
}
export interface FilterProps {
  headerGroups: any;
}
export interface FooterProps {
  gotoPage: (value: number) => void;
  setPageSize: (value: number) => void;
  rows: Row[];
  pageIndex: number;
  pageSize: number;
  hasPagination?: boolean;
  isLoading: boolean;
  limits?: number;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  showPagesNumber?: boolean;
}
export interface TableProps {
  columns: any;
  data: any[] | undefined;
  hasGlobalSearch?: boolean;
  hasAction?: boolean;
  actionList?: ActionObj[];
  hasPagination?: boolean;
  hasFilter?: boolean;
  isLoading: boolean;
  limits?: number;
  hasSelected?: boolean;
  setRowSelected?: any;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  showPagesNumber?: boolean;
  hasRowClick?: boolean;
  rowClickAction?: (row: Row) => any;
}
