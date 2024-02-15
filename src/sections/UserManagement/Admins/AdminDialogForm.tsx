import * as Yup from "yup";
import { forwardRef, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  FormHelperText,
  OutlinedInput,
  Select,
  Stack,
  Typography,
  Divider,
  DialogContent,
  Grid,
  InputLabel,
  MenuItem,
  Slide,
  Skeleton,
  DialogContentText,
  DialogActions,
  Switch,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { TransitionProps } from "@mui/material/transitions";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useGetRolesQuery,
  useLazyGetAdminQuery,
  useUpdateAdminMutation,
} from "store/api/userManagement";
import { isEmpty } from "lodash";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  adminId: number | string | null;
  mode: "new" | "edit" | "delete";
};

type roleType = {
  id: number;
  name: string;
  description: string;
};

const AdminDialogForm = ({
  isOpen = false,
  handleClose,
  adminId,
  mode,
}: Props) => {
  /**********hooks*********/
  //api
  const [getAdmin, { data, isSuccess, isLoading, isFetching }] =
    useLazyGetAdminQuery();
  const [deleteAdmin, { isLoading: loadingDelete }] = useDeleteAdminMutation();
  const [createAdmin] = useCreateAdminMutation();
  const [updateAdmin] = useUpdateAdminMutation();
  const { data: roleData } = useGetRolesQuery({});
  //RHF
  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    roles: Yup.number().required(),
    email: Yup.string().email().required(),
    username: Yup.string().required().min(3),
    password: Yup.string(),
    active: Yup.boolean(),
  });
  const resolver = yupResolver(validationSchema);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      username: "",
      password: "",
      active: false,
      roles: 0,
    },
    resolver,
  });
  //   lifecycle
  useEffect(() => {
    if (isSuccess) {
      const roles = isEmpty(data?.data?.roles) ? 0 : data?.data?.roles?.[0].id;
      reset({ ...data.data, roles });
    }
  }, [data, isSuccess, reset]);

  useEffect(() => {
    if (mode === "edit" && adminId) getAdmin(adminId);
    else if (mode === "new")
      reset({
        email: "",
        name: "",
        username: "",
        password: "",
        active: false,
        roles: 0,
      });
  }, [getAdmin, mode, reset, adminId]);

  /*********handlers***********/
  const onSubmit = async (values: any) => {
    if (mode === "new")
      await createAdmin({ ...values, roles: [values.roles] }).then(handleClose);
    else if (mode === "edit")
      await updateAdmin({
        id: adminId,
        data: { ...values, roles: [values.roles] },
      }).then(handleClose);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
      sx={{
        "& .MuiPaper-root": {
          width: "500px",
          minWidth: "80%",
        },
      }}
    >
      {mode !== "delete" ? (
        <>
          {" "}
          <DialogTitle>
            <Stack direction="row" spacing={1.25}>
              <Typography variant="h5" lineHeight="28px">
                {mode === "new" ? "New Admin" : data?.data?.name}
              </Typography>
            </Stack>
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ border: "1px solid secondary" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="username"
                    control={control}
                    render={({ field: { name, value, onChange, ref } }) => (
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor={name}>UserName</InputLabel>
                        {isLoading || isFetching ? (
                          <Skeleton height="60px" />
                        ) : (
                          <OutlinedInput
                            tabIndex={0}
                            id={name}
                            name={name}
                            type="text"
                            ref={ref}
                            value={value}
                            onChange={onChange}
                            error={Boolean(errors?.[name]?.message)}
                          />
                        )}
                        <FormHelperText
                          error={Boolean(errors?.[name]?.message)}
                        >
                          {errors[name]?.message}
                        </FormHelperText>
                      </Stack>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field: { name, value, onChange, ref } }) => (
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor={name}>Email</InputLabel>
                        {isLoading || isFetching ? (
                          <Skeleton height="60px" />
                        ) : (
                          <OutlinedInput
                            tabIndex={0}
                            id={name}
                            name={name}
                            type="email"
                            ref={ref}
                            value={value}
                            onChange={onChange}
                            error={Boolean(errors?.[name]?.message)}
                          />
                        )}
                        <FormHelperText
                          error={Boolean(errors?.[name]?.message)}
                        >
                          {errors[name]?.message}
                        </FormHelperText>
                      </Stack>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field: { name, value, onChange, ref } }) => (
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor={name}>Name</InputLabel>
                        {isLoading || isFetching ? (
                          <Skeleton height="60px" />
                        ) : (
                          <OutlinedInput
                            tabIndex={0}
                            id={name}
                            name={name}
                            type="text"
                            ref={ref}
                            value={value}
                            onChange={onChange}
                            error={Boolean(errors?.[name]?.message)}
                          />
                        )}
                        <FormHelperText
                          error={Boolean(errors?.[name]?.message)}
                        >
                          {errors[name]?.message}
                        </FormHelperText>
                      </Stack>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field: { name, value, onChange, ref } }) => (
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor={name}>Password</InputLabel>
                        {isLoading || isFetching ? (
                          <Skeleton height="60px" />
                        ) : (
                          <OutlinedInput
                            tabIndex={0}
                            id={name}
                            name={name}
                            type="password"
                            ref={ref}
                            value={value}
                            onChange={onChange}
                            error={Boolean(errors?.[name]?.message)}
                          />
                        )}
                        <FormHelperText
                          error={Boolean(errors?.[name]?.message)}
                        >
                          {errors[name]?.message}
                        </FormHelperText>
                      </Stack>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="roles"
                    control={control}
                    render={({ field: { name, value, onChange, ref } }) => (
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor={name}>Roles</InputLabel>
                        {isLoading || isFetching ? (
                          <Skeleton height="60px" />
                        ) : (
                          <Select
                            labelId={name}
                            id={name}
                            name={name}
                            value={value}
                            onChange={(e: any) => {
                              onChange(e);
                            }}
                            error={Boolean(errors?.[name])}
                          >
                            {roleData?.data?.items &&
                              roleData.data.items.map((role: roleType) => (
                                <MenuItem key={role.id} value={role.id}>
                                  {role.name}
                                </MenuItem>
                              ))}
                          </Select>
                        )}
                        <FormHelperText error={Boolean(errors?.[name])}>
                          {errors[name]?.message}
                        </FormHelperText>
                      </Stack>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="active"
                    control={control}
                    render={({ field: { name, value, onChange, ref } }) => (
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor={name}>Active</InputLabel>
                        {isLoading || isFetching ? (
                          <Skeleton height="60px" />
                        ) : (
                          <Switch
                            name={name}
                            onChange={onChange}
                            ref={ref}
                            color="success"
                            checked={value}
                          />
                        )}
                        <FormHelperText
                          error={Boolean(errors?.[name]?.message)}
                        >
                          {errors[name]?.message}
                        </FormHelperText>
                      </Stack>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Stack
                    direction="row"
                    spacing={1.25}
                    justifyContent="flex-end"
                  >
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <LoadingButton
                      loading={isSubmitting}
                      variant="contained"
                      type="submit"
                    >
                      Submit
                    </LoadingButton>
                  </Stack>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        </>
      ) : (
        <>
          <DialogTitle>
            <Stack direction="row" spacing={1.25}>
              <Typography variant="h5" lineHeight="28px">
                Delete
              </Typography>
            </Stack>
          </DialogTitle>
          <DialogContent sx={{ border: "1px solid secondary" }}>
            <DialogContentText>
              DO you want delete this admin?
            </DialogContentText>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Stack direction="row" spacing={1.25}>
              <Button variant="outlined" color="success" onClick={handleClose}>
                Cancel
              </Button>
              <LoadingButton
                loading={loadingDelete}
                variant="contained"
                color="error"
                type="button"
                onClick={async () => {
                  adminId && (await deleteAdmin(adminId).then(handleClose));
                }}
              >
                Delete
              </LoadingButton>
            </Stack>
          </DialogActions>
        </>
      )}
    </Dialog>
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
export default AdminDialogForm;
