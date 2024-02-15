import { Grid, Skeleton, TableCell, TableRow } from '@mui/material';
import { FooterProps } from 'types/table';
import TablePagination from './Pagination';

const Footer = ({
  gotoPage,
  rows,
  setPageSize,
  pageIndex,
  pageSize,
  hasPagination = true,
  isLoading,
  limits,
  showFirstButton = true,
  showLastButton = true,
  showPagesNumber = true,
}: FooterProps): JSX.Element => {
  return (
    <TableRow>
      {hasPagination && (
        <TableCell sx={{ p: 2 }} colSpan={12}>
          {isLoading ? (
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Skeleton />
              </Grid>
              <Grid item xs={6}>
                <Skeleton />
              </Grid>
            </Grid>
          ) : (
            <TablePagination
              limits={limits || 0}
              gotoPage={gotoPage}
              rows={rows}
              setPageSize={setPageSize}
              pageIndex={pageIndex}
              pageSize={pageSize}
              showFirstButton={showFirstButton}
              showLastButton={showLastButton}
              showPagesNumber={showPagesNumber}
            />
          )}
        </TableCell>
      )}
    </TableRow>
  );
};

export default Footer;
