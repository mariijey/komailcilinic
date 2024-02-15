import { forwardRef, useState, Ref } from "react";
import Properties from "sections/PropertyManagement";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Fade,
  Stack,
  DialogActions,
  Button,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useUpdateStatusMutation } from "store/api/propertyManagement";

const DontApprovedProperties = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<null | string | number>(null);
  const [updateStatus, { isLoading }] = useUpdateStatusMutation();
  const Transition = forwardRef(
    (
      props: TransitionProps & { children: React.ReactElement<any, any> },
      ref: Ref<unknown>
    ) => <Fade ref={ref} {...props} />
  );
  
  const actionList = [
    {
      id: 1,
      title: "Detail",
      hasLink: true,
      navigateLink: (id: string | number) => `/property-management/${id}`,
      access: { roles: [9] },
    },
    {
      id: 2,
      title: "Approve",
      hasLink: false,
      handleClick: (original: any) => {
        setSelectedId(original.id);
        setIsOpen(true);
      },
      access: { roles: [11] },
    },
    {
      id: 3,
      title: "Reports",
      hasLink: true,
      navigateLink: (id: string | number) =>
        `/property-management/${id}/reports`,
      access: { roles: [9] },
    },
  ];

  const handleClose = () => {
    setSelectedId(null);
    setIsOpen(false);
  };

  const approveHandler = () => {
    updateStatus({ id: selectedId, status: "listed" });
    handleClose();
  };

  return (
    <>
      <Properties actionList={actionList} propertyStatus={"pending"} />
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiDialog-paper": {
            width: 400,
            maxWidth: 1,
            m: { xs: 1.75, sm: 2.5, md: 4 },
          },
        }}
      >
        <DialogTitle sx={{ px: 0 }}>
          <Stack direction="row" spacing={1.25} sx={{ p: 2 }}>
            <Typography variant="h5">Approve Title</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent dividers sx={{ px: 0 }}>
          <Stack direction="row" spacing={1.25} sx={{ p: 2 }}>
            <Typography component="p">Description</Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Stack direction="row" spacing={1.25}>
            <LoadingButton
              variant="contained"
              loading={isLoading}
              onClick={approveHandler}
            >
              Approve
            </LoadingButton>
            <Button color="error" onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DontApprovedProperties;
