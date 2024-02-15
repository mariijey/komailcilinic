import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { InputLabel } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { Card } from "@mui/material";
import SingleFileUpload from "components/third-party/dropzone/SingleFile";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  useLazyGetCategoriesQuery,
  useNewCategoryMutation,
} from "store/api/contentManagement";
import { useUploadFileMutation } from "store/api/fileManagement";
import * as Yup from "yup";

const CreateCategory = () => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
  });
  const [newCategory, { isLoading, isSuccess, isError, error }] =
    useNewCategoryMutation();
  const [getCategories, { data: categoryList }] = useLazyGetCategoriesQuery();

  useEffect(() => {
    // requestCategory()
    getCategories();
  }, []);

  const [
    uploadFile,
    {
      data: dataUpload,
      isLoading: isLoadingUpload,
      isError: isErrorUpload,
      isSuccess: isSuccessUpload,
      error: errorUpload,
    },
  ] = useUploadFileMutation();

  useEffect(() => {
    if (isSuccessUpload) dataUpload && setValue("bannerId", dataUpload.data.id);
    else if (isErrorUpload) setValue("files", null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorUpload, isSuccessUpload]);

  const resolver = yupResolver(validationSchema);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "",
      title: "",
      shortDescription: "",
      description: "",
      parentId: "",
      bannerId: "",
      files: null,
    },
    resolver,
  });

  const onSubmit = (value: any) => {
    value.parentId = 0;
    newCategory(value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={7}>
          <Card variant="outlined" sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field: { name, value, ref, onChange } }) => (
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor={name}>Title</InputLabel>
                      <OutlinedInput
                        autoFocus
                        tabIndex={0}
                        id={name}
                        name={name}
                        type="text"
                        ref={ref}
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors?.[name]?.message)}
                      />
                      {errors?.[name]?.message && (
                        <FormHelperText error>
                          {errors[name]?.message}
                        </FormHelperText>
                      )}
                    </Stack>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="type"
                  control={control}
                  render={({ field: { name, ref, value, onChange } }) => (
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor={name}>Type</InputLabel>
                      <Select
                        tabIndex={1}
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors?.[name]?.message)}
                      >
                        <MenuItem value="faq">Faq Type</MenuItem>
                        <MenuItem value="news">News Type</MenuItem>
                      </Select>

                      {errors?.[name]?.message && (
                        <FormHelperText error>
                          {errors[name]?.message}
                        </FormHelperText>
                      )}
                    </Stack>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="parentId"
                  control={control}
                  render={({ field: { name, value, ref, onChange } }) => (
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor={name}>Parent</InputLabel>
                      <Select
                        tabIndex={2}
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors?.[name]?.message)}
                      >
                        <MenuItem value="">none</MenuItem>
                      </Select>
                      {errors?.[name]?.message && (
                        <FormHelperText error>
                          {errors[name]?.message}
                        </FormHelperText>
                      )}
                    </Stack>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="shortDescription"
                  control={control}
                  render={({ field: { name, value, ref, onChange } }) => (
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor={name}>Short Description</InputLabel>
                      <OutlinedInput
                        tabIndex={3}
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
                      {errors?.[name]?.message && (
                        <FormHelperText error>
                          {errors[name]?.message}
                        </FormHelperText>
                      )}
                    </Stack>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field: { name, ref, value, onChange } }) => (
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor={name}>Description</InputLabel>
                      <OutlinedInput
                        tabIndex={4}
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
                      {errors?.[name]?.message && (
                        <FormHelperText error>
                          {errors[name]?.message}
                        </FormHelperText>
                      )}
                    </Stack>
                  )}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card variant="outlined" sx={{ p: 1 }}>
            <Controller
              name="files"
              control={control}
              render={({ field: { name, value } }) => (
                <Stack spacing={1.25}>
                  <SingleFileUpload
                    file={value}
                    disabled={isLoadingUpload}
                    maxSize={5000000}
                    loading={isLoading || isLoadingUpload}
                    setFieldValue={(fileName, fileValue) => {
                      setValue(name, fileValue);
                      const formData = new FormData();
                      formData.append("file", fileValue[0]);
                      uploadFile(formData);
                    }}
                    onRemoveHandler={() => {
                      setValue(name, null);
                      setValue("bannerId", "");
                    }}
                    error={Boolean(errors?.[name]?.message)}
                  />
                </Stack>
              )}
            />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1.25} direction="row" justifyContent="flex-end">
            <LoadingButton
              loading={isLoading || isLoadingUpload}
              type="submit"
              size="large"
              variant="contained"
            >
              Submit
            </LoadingButton>
            <Button
              disabled={isLoading || isLoadingUpload}
              variant="outlined"
              color="error"
              type="button"
              size="large"
            >
              Cancel
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateCategory;
