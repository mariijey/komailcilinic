//react
import { useEffect, useMemo } from "react";
// material-ui
import { alpha, useTheme } from "@mui/material/styles";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
//lodash
import { isEmpty } from "utils/helpers/main";
//react-table
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from "react-table";
//i18n
//components
import Header from "./Header";
import Actions from "./Actions";
import Footer from "./Footer";
import Filter from "./Filter";
import MainCard from "components/MainCard";
import ScrollX from "components/ScrollX";
import SimpleTextFilter from "./Filter/SimpleText";
import { renderFilterTypes } from "components/Table/react-table";
import { IndeterminateCheckbox, TableRowSelection } from "./TableRowSelection";
//fake-data
import makeData from "data/react-table";
//props
import { TableProps } from "types/table";
import TableSkeleton from "./TableSkeleton";
import TableEmpty from "./TableEmpty";
import { GlobalFilter } from "./Filter/GlobalFilter";

export default function ReactTable({
  columns,
  data,
  isLoading,
  hasGlobalSearch = true,
  hasAction = true,
  actionList,
  hasPagination = false,
  hasFilter = false,
  limits,
  hasSelected = false,
  showFirstButton = true,
  showLastButton = true,
  showPagesNumber = true,
  setRowSelected,
  hasRowClick = false,
  rowClickAction,
}: TableProps): JSX.Element {
  const theme = useTheme();
  const fakeData = useMemo(() => makeData(1), []);
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const defaultColumn = useMemo(() => ({ Filter: SimpleTextFilter }), []);
  const initialState = useMemo(
    () => ({
      filters: [{ id: "status", value: "" }],
      pageIndex: 0,
      pageSize: 10,
      selectedRowIds: {},
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    // @ts-ignore
    page,
    prepareRow,
    // @ts-ignore
    gotoPage,
    // @ts-ignore
    setPageSize,
    // @ts-ignore
    state: { selectedRowIds, pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: isEmpty(data) ? fakeData : data,
      // @ts-ignore
      defaultColumn,
      // @ts-ignore
      initialState,
      filterTypes,
    },
    useGlobalFilter,
    useFilters,
    usePagination,
    useRowSelect,
    (hooks) => {
      hasSelected
        ? hooks.allColumns.push((columns: any) => [
            {
              id: "row-selection-chk",
              accessor: "Selection",
              disableSortBy: true,
              width: "5",
              Header: ({ getToggleAllPageRowsSelectedProps }: any) => (
                <IndeterminateCheckbox
                  indeterminate
                  {...getToggleAllPageRowsSelectedProps()}
                />
              ),
              filterable: false,
              canFilter: false,
              size: "small",
              Cell: ({ row }: any) => (
                <IndeterminateCheckbox
                  {...row.getToggleRowSelectedProps()}
                  style={{ disable: "flex" }}
                />
              ),
            },
            {
              id: "row-index",
              accessor: "rowIndex",
              Header: "Row",
              disableSortBy: true,
              size: "small",
              filterable: false,
              width: "5",
              Cell: ({ row }: any) => {
                const rowId = row.original?.id;
                if (rowId) return rowId;
                else return parseInt(row.id) + 1;
              },
            },
            ...columns,
          ])
        : hooks.allColumns.push((columns: any) => [
            {
              id: "row-index",
              accessor: "rowIndex",
              Header: "Row",
              disableSortBy: true,
              filterable: false,
              width: "5",
              Cell: ({ row }: any) => {
                const rowId = row.original?.id;
                if (rowId) return rowId;
                else return parseInt(row.id) + 1;
              },
            },
            ...columns,
          ]);
    }
  );

  useEffect(() => {
    hasSelected &&
      setRowSelected &&
      setRowSelected(
        Object.keys(selectedRowIds).map(
          (id: string) =>
            data?.filter((item, i) => String(i) === id && item)?.[0]
        )
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRowIds]);

  return (
    <>
      {hasFilter && <Filter headerGroups={headerGroups} />}
      <MainCard content={false}>
        <ScrollX>
          <Stack spacing={2}>
            {hasGlobalSearch && (
              <Box sx={{ p: 2, pb: 0 }}>
                <GlobalFilter />
              </Box>
            )}
            {hasSelected && (
              <TableRowSelection
                selected={Object.keys(selectedRowIds).length}
              />
            )}
            <Table {...getTableProps()}>
              <Header headerGroups={headerGroups} hasAction={hasAction} />
              <TableBody {...getTableBodyProps()}>
                {isLoading ? (
                  <TableSkeleton
                    headerGroups={headerGroups}
                    hasAction={hasAction}
                  />
                ) : isEmpty(data) ? (
                  <TableEmpty
                    hasSelected={hasSelected}
                    hasAction={hasAction}
                    columns={columns}
                  />
                ) : (
                  page.map((row: any, rowKey: number) => {
                    prepareRow(row);
                    return (
                      <TableRow
                        key={`tbl-row-${rowKey}`}
                        {...row.getRowProps()}
                        onClick={() => {
                          hasSelected && row.toggleRowSelected();
                          hasRowClick && rowClickAction?.(row);
                        }}
                        sx={{
                          cursor: "pointer",
                          bgcolor: row.isSelected
                            ? alpha(theme.palette.primary.lighter, 0.35)
                            : "inherit",
                        }}
                      >
                        {row.cells.map((cell: any, celKey: number) => (
                          <TableCell
                            key={`tbl-cell-${celKey}`}
                            {...cell.getCellProps([
                              { className: cell.column.className },
                            ])}
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            {cell.render("Cell")}
                          </TableCell>
                        ))}
                        {hasAction && !isEmpty(actionList) && (
                          <Actions actionList={actionList} row={row} />
                        )}
                      </TableRow>
                    );
                  })
                )}
                <Footer
                  isLoading={isLoading}
                  hasPagination={hasPagination}
                  gotoPage={gotoPage}
                  setPageSize={setPageSize}
                  rows={rows}
                  pageIndex={pageIndex}
                  pageSize={pageSize}
                  limits={limits}
                  showFirstButton={showFirstButton}
                  showLastButton={showLastButton}
                  showPagesNumber={showPagesNumber}
                />
              </TableBody>
            </Table>
          </Stack>
        </ScrollX>
      </MainCard>
    </>
  );
}
