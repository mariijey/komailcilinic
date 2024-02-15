import { LoadingButton } from "@mui/lab";
import { Slide, Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { Divider } from "@mui/material";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { Dialog } from "@mui/material";
import ReactTable from "components/Table";
import { forwardRef, useEffect, useMemo, useState } from "react";
import {
  useDeleteCategoryMutation,
  useLazyGetCategoriesQuery,
} from "store/api/contentManagement";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { TransitionProps } from "@mui/material/transitions";

type Props = {
  type: "faq" | "news";
};
const Categories = ({ type }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | string | null>(null);

  const [
    getCategories,
    { data, isLoading: isLoadingData, isFetching: isFetchingData },
  ] = useLazyGetCategoriesQuery();

  const [deleteReq, { isLoading }] = useDeleteCategoryMutation();
  const columns = [
    {
      Header: "Banner",
      accessor: "banner",
      disableSortBy: true,
      sortName: "sortByName",
      filterable: false,
      Cell: ({ value }: { value: { downloadUrl: string } }) =>
        value?.downloadUrl ? (
          <img
            src={value?.downloadUrl}
            alt="category-image"
            width="50px"
            aria-hidden
          />
        ) : (
          "-"
        ),
    },
    {
      Header: "Title",
      accessor: "title",
      disableSortBy: true,
      sortName: "sortByName",
      filterable: false,
      width: "50",
    },
    {
      Header: "Short Description",
      accessor: "shortDescription",
      disableSortBy: true,
      sortName: "sortByName",
      filterable: false,
      width: "100",
    },
  ];

  const actionList = [
    {
      id: 0,
      title: "Edit",
      hasLink: true,
      navigateLink: (id: any) => `/${type}/categories/${id}`,
      access: { roles: [15] },
    },
    {
      id: 1,
      title: "Delete",
      hasLink: false,
      handleClick: (row: any) => {
        setIsOpen(true);
        setSelectedId(row.original.id);
      },
      access: { roles: [16] },
    },
  ];

  useEffect(() => {
    getCategories({ type });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseDialog = () => {
    setSelectedId(null);
    setIsOpen(false);
  };

  return (
    <>
      <ReactTable
        isLoading={isLoadingData || isFetchingData}
        // eslint-disable-next-line react-hooks/exhaustive-deps
        columns={useMemo(() => columns, [])}
        data={data?.data.items}
        limits={data?.data.pagination?.total}
        hasGlobalSearch={false}
        actionList={actionList}
        hasAction={true}
        hasFilter={false}
        hasPagination={true}
      />
      <Dialog
        open={isOpen}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
        keepMounted
        sx={{
          "& .MuiPaper-root": {
            minWidth: "40%",
          },
        }}
      >
        <DialogTitle>
          <Stack direction="row" spacing={1.25}>
            <ErrorOutlineIcon color="error" />
            <Typography variant="h5" lineHeight="28px">
              Delete Action
            </Typography>
          </Stack>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ border: "1px solid secondary" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                Delete alert text
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ my: 1 }}>
          <Button
            variant="outlined"
            color="success"
            onClick={handleCloseDialog}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={isLoading}
            variant="contained"
            color="error"
            onClick={() => {
              deleteReq(selectedId);
              handleCloseDialog();
            }}
          >
            Approve
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default Categories;
