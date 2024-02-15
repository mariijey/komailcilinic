import * as Yup from "yup";
import { forwardRef, useEffect } from "react";
import {
  Button,
  Chip,
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
  Box,
  MenuItem,
  Slide,
  Skeleton,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Theme, useTheme } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  useCreateRoleMutation,
  useDeleteRoleMutation,
  useLazyGetRoleQuery,
  useUpdateRoleMutation,
} from "store/api/userManagement";
import { useLazyGetPermissionsQuery } from "store/api/userManagement";
import { usePermissionsContext } from "contexts/Permissions";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  roleId: number | string | null;
  mode: "new" | "edit" | "delete";
};

type PermissionType = {
  id: number;
  name: string;
  codename: string;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getStyles = (
  name: string,
  personName: readonly string[],
  theme: Theme
) => {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

const RoleDialogForm = ({
  isOpen = false,
  handleClose,
  roleId,
  mode,
}: Props) => {
  /**********hooks*********/
  const theme = useTheme();
  //api
  const [getRole, { data, isSuccess, isLoading, isFetching }] =
    useLazyGetRoleQuery();
  const [deleteRole, { isLoading: loadingDelete }] = useDeleteRoleMutation();
  const [createRole] = useCreateRoleMutation();
  const [updateRole] = useUpdateRoleMutation();
  const [getPermissionsList] = useLazyGetPermissionsQuery();
  const permissionCtx = usePermissionsContext();

  useEffect(() => {
    if (!permissionCtx?.permissions)
      getPermissionsList({}).then((res) => {
        permissionCtx?.handlePermissions(res.data.data);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissionCtx]);

  //RHF
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    permissions: Yup.array().min(1, "Please select at least one option"),
    description: Yup.string(),
  });
  const resolver = yupResolver(validationSchema);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      permissions: [],
    },
    resolver,
  });
  //lifecycle
  useEffect(() => {
    if (data) {
      const permissions = data?.data?.permissions.map(
        (item: PermissionType) => item.id
      );
      reset({ ...data.data, permissions });
    }
  }, [data, isSuccess, reset]);

  useEffect(() => {
    if (mode === "edit" && roleId) getRole(roleId);
    else if (mode === "new")
      reset({
        name: "",
        description: "",
        permissions: [],
      });
  }, [getRole, mode, reset, roleId]);

  /*********handlers***********/
  const onSubmit = async (values: any) => {
    if (mode === "new") await createRole(values).then(handleClose);
    else if (mode === "edit")
      await updateRole({ id: roleId, data: values }).then(handleClose);
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
                {mode === "new" ? "New Role" : data?.data?.name}
              </Typography>
            </Stack>
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ border: "1px solid secondary" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                  <Controller
                    name="permissions"
                    control={control}
                    render={({ field: { name, value, onChange, ref } }) => (
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor={name}>Permissions</InputLabel>
                        {isLoading || isFetching ? (
                          <Skeleton height="60px" />
                        ) : (
                          <Select
                            labelId={name}
                            id={name}
                            multiple
                            value={value}
                            onChange={onChange}
                            input={<OutlinedInput id={name} />}
                            renderValue={(selected) => (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
                                {selected.map((valueSelected: number) => {
                                  const selectPermission =
                                    permissionCtx?.permissions?.filter(
                                      (permission: PermissionType) =>
                                        permission.id === valueSelected
                                    );
                                  return (
                                    <Chip
                                      key={
                                        selectPermission
                                          ? selectPermission[0].id
                                          : ""
                                      }
                                      label={
                                        selectPermission
                                          ? selectPermission[0].name
                                          : ""
                                      }
                                    />
                                  );
                                })}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                            error={Boolean(errors?.[name])}
                          >
                            {permissionCtx?.permissions?.map(
                              (permission: PermissionType) => (
                                <MenuItem
                                  key={permission.id}
                                  value={permission.id}
                                  style={getStyles(
                                    permission.name,
                                    value,
                                    theme
                                  )}
                                >
                                  {permission.name}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        )}
                        <FormHelperText error={Boolean(errors?.[name])}>
                          {errors[name]?.message}
                        </FormHelperText>
                      </Stack>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field: { name, value, onChange, ref } }) => (
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor={name}>Description</InputLabel>
                        {isLoading || isFetching ? (
                          <Skeleton height="150px" />
                        ) : (
                          <OutlinedInput
                            tabIndex={3}
                            // disabled={Boolean(id && isLoadingPost)}
                            multiline
                            id={name}
                            name={name}
                            type="text"
                            ref={ref}
                            rows={4}
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
                Delete Role
              </Typography>
            </Stack>
          </DialogTitle>
          <DialogContent sx={{ border: "1px solid secondary" }}>
            <DialogContentText>DO you want delete this role?</DialogContentText>
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
                  roleId && (await deleteRole(roleId).then(handleClose));
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
export default RoleDialogForm;
