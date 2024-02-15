import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Pagination as MuiPagination,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface PaginationProps {
  gotoPage: (value: number) => void;
  setPageSize: (value: number) => void;
  pageIndex: number;
  pageSize: number;
  rows: any[];
  limits: number;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  showPagesNumber?: boolean;
}

const TablePagination = ({
  gotoPage,
  rows,
  setPageSize,
  pageSize,
  pageIndex,
  limits,
  showFirstButton = true,
  showLastButton = true,
  showPagesNumber = true,
}: PaginationProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setPageSize(Number(searchParams.get("perPage") || 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    gotoPage(value);
    searchParams.set("currentPage", `${Number(value)}`);
    searchParams.set("perPage", `${pageSize}`);
    setSearchParams(searchParams);
  };

  const handleChange = (event: SelectChangeEvent<number>) => {
    const limit = +event.target.value;
    
    setPageSize(limit);
    searchParams.set("perPage", `${limit}`);
    searchParams.set("currentPage", pageIndex.toString());
    setSearchParams(searchParams);
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      sx={{ width: "auto" }}
    >
      <Grid item>
        <Stack direction="row" spacing={1} alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="caption" color="secondary">
              Row Per Page
            </Typography>
            <FormControl sx={{ m: 1 }}>
              <Select
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={pageSize}
                onChange={handleChange}
                size="small"
                sx={{ "& .MuiSelect-select": { py: 0.75, px: 1.25 } }}
                disabled={limits < 5}
              >
                <MenuItem key={1} value={5}>
                  5
                </MenuItem>
                <MenuItem key={2} value={10}>
                  10
                </MenuItem>
                <MenuItem key={3} value={25}>
                  25
                </MenuItem>
                <MenuItem key={4} value={50}>
                  50
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Grid>
      <Grid item sx={{ mt: { xs: 2, sm: 0 } }}>
        <Box
          sx={{
            "& .MuiPaginationItem-page": {
              display: !showPagesNumber ? "none" : "initial",
            },
            "& .MuiPaginationItem-ellipsis": {
              display: !showPagesNumber ? "none" : "initial",
            },
          }}
        >
          <MuiPagination
            count={limits && Math.ceil(limits / pageSize)}
            // @ts-ignore
            page={
              isEmpty(searchParams.get("currentPage"))
                ? 1
                : Math.ceil(Number(searchParams.get("currentPage")))
            }
            onChange={handleChangePagination}
            color="primary"
            variant="combined"
            showFirstButton={showFirstButton}
            showLastButton={showLastButton}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default TablePagination;
