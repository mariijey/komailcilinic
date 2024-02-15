import { Skeleton, TableCell, TableRow } from '@mui/material';
import { HeaderProps } from '../../types/table';

const TableSkeleton = ({ headerGroups, hasAction }: HeaderProps): JSX.Element => {
  return (
    <>
      {[1, 2, 3].map((idx: any, i: number) => (
        <TableRow key={`tbl-sk-${idx}`}>
          {headerGroups[0]?.headers.map((column: any, key: number) => (
            <TableCell key={`tbl-sk-${key}`}>
              <Skeleton />
            </TableCell>
          ))}
          {hasAction && (
            <TableCell>
              <Skeleton />
            </TableCell>
          )}
        </TableRow>
      ))}
    </>
  );
};
export default TableSkeleton;
