import { HeaderGroup } from 'react-table';

export interface ActionObj {
  id: number | string;
  title: string;
  isDisabl: boolean;
  handleClick: (e?: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

export interface ActionProps {
  actionList: ActionObj[];
}

export interface HeaderProps {
  headerGroups: HeaderGroup<object>[];
  columnAlign?: string;
  hasAction: boolean;
}
