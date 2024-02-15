import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  DialogActions,
  DialogContent,
  Divider,
  FormHelperText,
  Stack,
} from "@mui/material";
import {
  InputLabel,
  Select,
  Button,
  MenuItem,
  DialogTitle,
  Dialog,
} from "@mui/material";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useUpdateStatusMutation } from "store/api/propertyManagement";
import * as Yup from "yup";
import { PROPERTY_STATUS } from "utils/helpers/constant";

type Props = {
  onClose: () => void;
  selectedId: string | number;
  isOpen: boolean;
  defaultValue: string;
};

const selectList = [
  "draft",
  "pending_payment",
  "pending",
  "listed",
  "rented",
  "canceled",
];

const ChangeStatusDialog = ({
  onClose,
  selectedId,
  isOpen,
  defaultValue,
}: Props) => {
  const [updateStatus, { isLoading, isSuccess, isError, error }] =
    useUpdateStatusMutation();

  const resolver = yupResolver(
    Yup.object().shape({
      status: Yup.string().required(),
    })
  );

  const {
    handleSubmit,
    control,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "",
    },
    resolver,
  });
  useEffect(() => {
    !isEmpty(defaultValue) && reset({ status: defaultValue });
  }, [defaultValue, reset]);

  const onSubmit = (values: { status: string }) => {
    updateStatus({ id: selectedId, status: values.status });
    handleClose();
  };

  const handleClose = () => {
    reset({ status: "" });
    clearErrors();
    onClose?.();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={isOpen}
      sx={{
        "& .MuiPaper-root": {
          minWidth: "40%",
        },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Change Status</DialogTitle>
        <Divider />
        <DialogContent>
          <Controller
            name="status"
            control={control}
            render={({ field: { name, value, ref, onChange } }) => {
              return (
                <Stack spacing={1.25}>
                  <InputLabel htmlFor={name}>Name</InputLabel>
                  <Select
                    name={name}
                    id={name}
                    value={value}
                    ref={ref}
                    onChange={onChange}
                    error={Boolean(errors?.[name]?.message)}
                  >
                    {selectList.map((status: string, key: number) => {
                      return (
                        <MenuItem key={key} value={status}>
                          {PROPERTY_STATUS[status]}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {errors?.status?.message && (
                    <FormHelperText error>
                      {errors.status?.message}
                    </FormHelperText>
                  )}
                </Stack>
              );
            }}
          />
        </DialogContent>
        <DialogActions>
          <Stack direction="row">
            <LoadingButton loading={isLoading} type="submit" color="primary">
              Submit
            </LoadingButton>
            <Button color="error" type="button" onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ChangeStatusDialog;
