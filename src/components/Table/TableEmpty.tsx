import { TableCell, TableRow } from '@mui/material';
import NoResultListCmp from '../NoResultListCmp';

const TableEmpty = ({ hasSelected, hasAction, columns }: any): JSX.Element => {
  return (
    <TableRow>
      <TableCell
        align="center"
        sx={{ p: 2 }}
        colSpan={hasSelected && hasAction ? columns?.length + 2 : hasSelected || hasAction ? columns?.length + 2 : columns?.length + 1}
      >
        <NoResultListCmp subject={''} />
      </TableCell>
    </TableRow>
  );
};
export default TableEmpty;
