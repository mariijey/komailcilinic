import { LoadingButton } from "@mui/lab";
import { Button, Grid, Slide } from "@mui/material";
import { Stack } from "@mui/material";
import { DialogContent, DialogTitle, Divider } from "@mui/material";
import { DialogActions } from "@mui/material";
import { Dialog } from "@mui/material";
import ReactTable from "components/Table";
import { forwardRef, useEffect, useMemo, useState } from "react";
import {
  useDeletePostMutation,
  useLazyGetPostsQuery,
} from "store/api/contentManagement";
import { TransitionProps } from "@mui/material/transitions";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Typography } from "@mui/material";

type Props = {
  type: "faq" | "news";
  columns: any;
};
const Posts = ({ type, columns }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | string | null>(null);
  const [
    getPosts,
    { data, isLoading: isLoadingData, isFetching: isFetchingData },
  ] = useLazyGetPostsQuery();

  const [deleteReq, { isLoading }] = useDeletePostMutation();

  const actionList = [
    {
      id: 0,
      title: "Edit",
      hasLink: true,
      navigateLink: (id: any) => `/${type}/${id}`,
      access: { roles: [15] },
    },
    {
      id: 1,
      title: "Delete",
      hasLink: false,
      handleClick: (original: any) => {
        setSelectedId(original.id);
        setIsOpen(true);
      },
      access: { roles: [16] },
    },
  ];

  useEffect(() => {
    getPosts({ categoryType: type });
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
        limits={data?.data.pagination.total}
        hasGlobalSearch={false}
        actionList={actionList}
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
                Delete Alert Text
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
  return <Slide direction="up" ref={ref} {...props} />;
});

export default Posts;
