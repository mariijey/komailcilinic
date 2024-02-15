import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box, FormHelperText, Grid } from "@mui/material";
import MainCard from "components/MainCard";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Stack } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Skeleton } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import SingleFileUpload from "components/third-party/dropzone/SingleFile";
import {
  useGetUserQuery,
  useUserUpdateMutation,
} from "store/api/userManagement";
import { Params, useParams } from "react-router";
import { useUploadFileMutation } from "store/api/fileManagement";
import { LoadingButton } from "@mui/lab";
import { Divider } from "@mui/material";
import AccessGuard from "utils/route-guard/AccessGuard";

type Props = {};

const AgentInfo = (props: Props) => {
  const params = useParams() as Params;
  const id: string = params.id as string;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data, isLoading: isLoadingGetData, isSuccess } = useGetUserQuery(id);
  const [updateProfile, { isLoading: LoadingUpdateData }] =
    useUserUpdateMutation();
  const [
    uploadFile,
    {
      data: dataUpload,
      isLoading: isLoadingUpload,
      isError: isErrorUpload,
      isSuccess: isSuccessUpload,
    },
  ] = useUploadFileMutation();

  const resolver = yupResolver<any>(
    Yup.object().shape({
      name: Yup.string().max(255),
      email: Yup.string().email(),
      mobile: Yup.string()
        .matches(
          /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
          "Invalid phone number format"
        )
        .required("Phone number is required"),
      about: Yup.string().nullable(),
      phone: Yup.string().nullable(),
    })
  );
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      phone: "",
      logoId: null as any,
      about: "",
      openingHours: null,
      files: "" as any,
    },
    resolver,
  });

  useEffect(() => {
    if (isSuccess)
      reset({
        ...data?.data?.agent,
        files: data?.data?.agent?.logo?.downloadUrl || null,
      });
  }, [data?.data, isSuccess, reset]);

  useEffect(() => {
    if (isSuccessUpload) dataUpload && setValue("logoId", dataUpload.data.id);
    else if (isErrorUpload) setValue("files", null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorUpload, isSuccessUpload]);

  useEffect(() => {
    if (isLoadingGetData || isLoadingUpload || LoadingUpdateData)
      setIsLoading(true);
    else setIsLoading(false);
  }, [isLoadingGetData, isLoadingUpload, LoadingUpdateData]);

  const onSubmit = async (data: any) => {
    await updateProfile({ id, data: { agent: data } });
  };

  return (
    <MainCard content={false} title={"Agent Information"} sx={{ mb: 1 }}>
      <Box sx={{ p: 2.5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                      <InputLabel htmlFor={name}>
                       Mobile
                      </InputLabel>
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
                name="phone"
                control={control}
                render={({
                  field: { name, value, ref, onChange, ...other },
                }) => {
                  return (
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor={name}>
                       Phone
                      </InputLabel>
                      {isLoading ? (
                        <Skeleton />
                      ) : (
                        <>
                          <OutlinedInput
                            tabIndex={3}
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
            <Grid item xs={6}>
              <Controller
                name="about"
                control={control}
                render={({
                  field: { name, value, ref, onChange, ...other },
                }) => {
                  return (
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor={name}>
                        About Agent
                      </InputLabel>
                      {isLoading ? (
                        <Skeleton />
                      ) : (
                        <>
                          <OutlinedInput
                            tabIndex={4}
                            multiline
                            rows={8}
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
            <Grid item xs={6}>
              <Controller
                name="files"
                control={control}
                render={({ field: { name, value, ref, onChange } }) => (
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="article">
                      Image
                    </InputLabel>
                    {isLoading ? (
                      <Skeleton />
                    ) : (
                      <SingleFileUpload
                        file={value}
                        disabled={isLoading}
                        maxSize={5000000}
                        loading={isLoading}
                        setFieldValue={(fileName, fileValue) => {
                          setValue(name, fileValue);
                          const formData = new FormData();
                          formData.append("file", fileValue[0]);
                          uploadFile(formData);
                        }}
                        onRemoveHandler={() => {
                          setValue(name, null);
                          setValue("logoId", null);
                        }}
                        error={Boolean(errors?.[name]?.message)}
                      />
                    )}
                  </Stack>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <AccessGuard access={{ roles: [1, 3] }}>
              <Grid item xs={12} display="flex" justifyContent="flex-end">
                <LoadingButton
                  tabIndex={8}
                  loading={isLoading}
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
  );
};
export default AgentInfo;
