import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box, Divider, Grid, InputLabel } from "@mui/material";
import MainCard from "components/MainCard";
import { Controller, useForm } from "react-hook-form";
import { Stack } from "@mui/material";
import { Skeleton } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  useGetUserQuery,
  useUserUpdateMutation,
} from "store/api/userManagement";
import { Params, useParams } from "react-router";
import { useEffect, useState } from "react";
import AccessGuard from "utils/route-guard/AccessGuard";

const options = ["landlord", "agent", "interested", "other"];
const PersonalInformation = () => {
  const params = useParams() as Params;
  const id: string = params.id as string;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data, isLoading: isLoadingGetData, isSuccess } = useGetUserQuery(id);
  const [updateProfile, { isLoading: LoadingUpdateData }] =
    useUserUpdateMutation();

  const resolver = yupResolver<any>(
    Yup.object().shape({
      name: Yup.string().max(255).required("is required"),
      mobile: Yup.string()
        .matches(
          /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
          "Invalid phone number format"
        )
        .required("Phone number is required"),
      bio: Yup.string().nullable(),
      userType: Yup.string().nullable(),
      address: Yup.object()
        .shape({
          address: Yup.string().nullable(),
          phone: Yup.string().nullable(),
          postcode: Yup.string().nullable(),
        })
        .nullable(),
    })
  );
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      userType: "",
      bio: "",
      address: {
        phone: "",
        address: "",
        postcode: "",
      },
    },
    resolver,
  });

  useEffect(() => {
    if (isSuccess) reset(data?.data);
  }, [data?.data, isSuccess, reset]);

  useEffect(() => {
    if (isLoadingGetData || LoadingUpdateData) setIsLoading(true);
    else setIsLoading(false);
  }, [isLoadingGetData, LoadingUpdateData]);

  const onSubmit = async (data: any) => await updateProfile({ id, data });
  return (
    <>
      <MainCard content={false} title={"Personal Information"} sx={{ mb: 1 }}>
        <Box sx={{ p: 2.5 }}>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1.5}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="name"
                  control={control}
                  render={({
                    field: { name, value, ref, onChange, ...other },
                  }) => {
                    return (
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor={name}>FullName</InputLabel>
                        {isLoading ? (
                          <Skeleton />
                        ) : (
                          <>
                            <OutlinedInput
                              autoFocus
                              tabIndex={0}
                              id={name}
                              type="text"
                              value={value}
                              name={name}
                              ref={ref}
                              onChange={onChange}
                              fullWidth
                              error={Boolean(errors?.[name]?.message)}
                              {...other}
                            />

                            <FormHelperText
                              error={Boolean(errors?.[name]?.message)}
                            >
                              {errors?.[name]?.message}
                            </FormHelperText>
                          </>
                        )}
                      </Stack>
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="email"
                  control={control}
                  render={({
                    field: { name, value, ref, onChange, ...other },
                  }) => {
                    return (
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor={name}>Email</InputLabel>
                        {isLoading ? (
                          <Skeleton />
                        ) : (
                          <>
                            <OutlinedInput
                              tabIndex={1}
                              id={name}
                              type="email"
                              value={value}
                              name={name}
                              ref={ref}
                              onChange={onChange}
                              fullWidth
                              error={Boolean(errors?.[name]?.message)}
                              {...other}
                            />

                            <FormHelperText
                              error={Boolean(errors?.[name]?.message)}
                            >
                              {errors?.[name]?.message}
                            </FormHelperText>
                          </>
                        )}
                      </Stack>
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="mobile"
                  control={control}
                  render={({
                    field: { name, value, ref, onChange, ...other },
                  }) => {
                    return (
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor={name}>Mobile</InputLabel>
                        {isLoading ? (
                          <Skeleton />
                        ) : (
                          <>
                            <OutlinedInput
                              tabIndex={2}
                              id={name}
                              type="text"
                              value={value}
                              name={name}
                              ref={ref}
                              onChange={onChange}
                              fullWidth
                              error={Boolean(errors?.[name]?.message)}
                            />

                            <FormHelperText
                              error={Boolean(errors?.[name]?.message)}
                            >
                              {errors?.[name]?.message}
                            </FormHelperText>
                          </>
                        )}
                      </Stack>
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="userType"
                  control={control}
                  render={({ field: { name, value, ref, onChange } }) => {
                    return (
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor={name}>User Type</InputLabel>
                        {isLoading ? (
                          <Skeleton />
                        ) : (
                          <>
                            <Select
                              tabIndex={3}
                              fullWidth
                              id={name}
                              value={value}
                              name={name}
                              onChange={onChange}
                              error={Boolean(errors?.[name]?.message)}
                            >
                              {options.map((option, i: number) => (
                                <MenuItem key={i} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                            </Select>

                            <FormHelperText
                              error={Boolean(errors?.[name]?.message)}
                            >
                              {errors?.[name]?.message}
                            </FormHelperText>
                          </>
                        )}
                      </Stack>
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="bio"
                  control={control}
                  render={({
                    field: { name, value, ref, onChange, ...other },
                  }) => {
                    return (
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor={name}>Biography</InputLabel>
                        {isLoading ? (
                          <Skeleton />
                        ) : (
                          <>
                            <OutlinedInput
                              tabIndex={4}
                              multiline
                              rows={4}
                              id={name}
                              type="text"
                              value={value}
                              name={name}
                              ref={ref}
                              onChange={onChange}
                              fullWidth
                              error={Boolean(errors?.[name]?.message)}
                            />

                            <FormHelperText
                              error={Boolean(errors?.[name]?.message)}
                            >
                              {errors?.[name]?.message}
                            </FormHelperText>
                          </>
                        )}
                      </Stack>
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="address.phone"
                  control={control}
                  render={({
                    field: { name, value, ref, onChange, ...other },
                  }) => {
                    return (
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor={name}>Phone</InputLabel>
                        {isLoading ? (
                          <Skeleton />
                        ) : (
                          <>
                            <OutlinedInput
                              tabIndex={5}
                              id={name}
                              type="text"
                              value={value}
                              name={name}
                              ref={ref}
                              onChange={onChange}
                              fullWidth
                              error={Boolean(errors?.address?.phone?.message)}
                            />

                            <FormHelperText
                              error={Boolean(errors?.address?.phone?.message)}
                            >
                              {errors?.address?.phone?.message}
                            </FormHelperText>
                          </>
                        )}
                      </Stack>
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="address.postcode"
                  control={control}
                  render={({
                    field: { name, value, ref, onChange, ...other },
                  }) => {
                    return (
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor={name}>Post Code</InputLabel>
                        {isLoading ? (
                          <Skeleton />
                        ) : (
                          <>
                            <OutlinedInput
                              tabIndex={6}
                              id={name}
                              type="text"
                              value={value}
                              name={name}
                              ref={ref}
                              onChange={onChange}
                              fullWidth
                              error={Boolean(
                                errors?.address?.postcode?.message
                              )}
                            />

                            <FormHelperText
                              error={Boolean(
                                errors?.address?.postcode?.message
                              )}
                            >
                              {errors?.address?.postcode?.message}
                            </FormHelperText>
                          </>
                        )}
                      </Stack>
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="address.address"
                  control={control}
                  render={({
                    field: { name, value, ref, onChange, ...other },
                  }) => {
                    return (
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor={name}>Address</InputLabel>
                        {isLoading ? (
                          <Skeleton />
                        ) : (
                          <>
                            <OutlinedInput
                              tabIndex={7}
                              multiline
                              rows={2}
                              id={name}
                              type="text"
                              value={value}
                              name={name}
                              ref={ref}
                              onChange={onChange}
                              fullWidth
                              error={Boolean(errors?.address?.address?.message)}
                            />

                            <FormHelperText
                              error={Boolean(errors?.address?.address?.message)}
                            >
                              {errors?.address?.address?.message}
                            </FormHelperText>
                          </>
                        )}
                      </Stack>
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <AccessGuard access={{ roles: [1, 3] }}>
                <Grid item xs={12} display="flex" justifyContent="flex-end">
                  <LoadingButton
                    tabIndex={8}
                    loading={LoadingUpdateData}
                    variant="contained"
                    type="submit"
                  >
                    Save
                  </LoadingButton>
                </Grid>
              </AccessGuard>
            </Grid>
          </form>
        </Box>
      </MainCard>
    </>
  );
};

export default PersonalInformation;
