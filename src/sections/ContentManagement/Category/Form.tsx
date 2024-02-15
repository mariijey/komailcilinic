import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  OutlinedInput,
  Stack,
  Button,
  FormHelperText,
  InputLabel,
  Card,
  Grid,
} from "@mui/material";
import SingleFileUpload from "components/third-party/dropzone/SingleFile";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import {
  useLazyGetCategoryQuery,
  useNewCategoryMutation,
  useUpdateCategoryMutation,
} from "store/api/contentManagement";
import { useUploadFileMutation } from "store/api/fileManagement";
import * as Yup from "yup";

type Props = {
  type: "news" | "faq";
};

const CategoryForm = ({ type }: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
  });
  const [
    newCategory,
    { isLoading: isLoadingNew, isSuccess: isSuccessNew, isError: isErrorNew },
  ] = useNewCategoryMutation();
  const [updateCategory, { isLoading: isLoadingUpdate }] =
    useUpdateCategoryMutation();
  const [
    getCategory,
    {
      data: categoryData,
      isLoading: isLoadingCategory,
      isSuccess: isSuccessGetCategory,
    },
  ] = useLazyGetCategoryQuery();

  const [
    uploadFile,
    {
      data: dataUpload,
      isLoading: isLoadingUpload,
      isError: isErrorUpload,
      isSuccess: isSuccessUpload,
    },
  ] = useUploadFileMutation();

  const resolver = yupResolver(validationSchema);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      shortDescription: "",
      bannerId: "",
      files: null,
    },
    resolver,
  });

  useEffect(() => {
    if (!isEmpty(id) && id) getCategory(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (isSuccessUpload) dataUpload && setValue("bannerId", dataUpload.data.id);
    else if (isErrorUpload) setValue("files", null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorUpload, isSuccessUpload]);

  useEffect(() => {
    if (isSuccessNew) navigate(`/${type}/categories`);
    else if (isErrorNew) setValue("files", null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessNew, isErrorNew]);

  useEffect(() => {
    if (isSuccessGetCategory && categoryData)
      reset({
        shortDescription: categoryData.data.shortDescription,
        title: categoryData.data.title,
        files: categoryData.data.banner?.downloadUrl as any,
        bannerId: categoryData.data.banner?.id,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessGetCategory]);

  const onSubmit = (values: any) => {
    if (isEmpty(id)) return newCategory({ ...values, type });
    else return updateCategory({ id, values });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={7}>
          <Card variant="outlined" sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field: { name, value, ref, onChange } }) => (
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor={name}>{"Title"}</InputLabel>
                      <OutlinedInput
                        disabled={Boolean(id && isLoadingCategory)}
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
              <Grid item xs={12}>
                <Controller
                  name="shortDescription"
                  control={control}
                  render={({ field: { name, value, ref, onChange } }) => (
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor={name}>Short Description</InputLabel>
                      <OutlinedInput
                        disabled={Boolean(id && isLoadingCategory)}
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
                  <InputLabel htmlFor={name}>Image</InputLabel>
                  <SingleFileUpload
                    file={value}
                    disabled={isLoadingUpload}
                    maxSize={5000000}
                    loading={isLoadingNew || isLoadingUpload || isLoadingUpdate}
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
              loading={isLoadingNew || isLoadingUpload || isLoadingUpdate}
              type="submit"
              size="large"
              variant="contained"
            >
              Submit
            </LoadingButton>
            <Button
              disabled={isLoadingNew || isLoadingUpload || isLoadingUpdate}
              variant="outlined"
              color="error"
              type="button"
              size="large"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default CategoryForm;
