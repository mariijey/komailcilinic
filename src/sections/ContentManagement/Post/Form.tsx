import { yupResolver } from "@hookform/resolvers/yup";
import {
  Card,
  Chip,
  InputLabel,
  FormHelperText,
  OutlinedInput,
  Stack,
  Grid,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TextEditor from "components/TextEditor";
import SingleFileUpload from "components/third-party/dropzone/SingleFile";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  useGetCategoriesQuery,
  useLazyGetPostQuery,
  useNewPostMutation,
  useUpdatePostMutation,
} from "store/api/contentManagement";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { CategorySchema } from "types/content";
import { LoadingButton } from "@mui/lab";
import { useUploadFileMutation } from "store/api/fileManagement";
import { useNavigate, useParams } from "react-router";
import { isEmpty } from "lodash";
import { openSnackbar } from "store/reducers/snackbar";

type Props = {
  type: "faq" | "news";
};

const PostForm = ({ type }: Props) => {
  const theme = useTheme();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tagList, setTagList] = useState<string[]>([""]);

  const { data: categoryList, isSuccess: isSuccessLoadCategories } =
    useGetCategoriesQuery({ type });
  const [
    uploadFile,
    {
      data: dataUpload,
      isLoading: isLoadingUpload,
      isError: isErrorUpload,
      isSuccess: isSuccessUpload,
    },
  ] = useUploadFileMutation();
  const [createPost, { isLoading: isLoadingNew, isSuccess: isSuccessNew }] =
    useNewPostMutation();

  const [
    updatePost,
    { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate },
  ] = useUpdatePostMutation();

  const [
    getPost,
    { data: postData, isLoading: isLoadingPost, isSuccess: isSuccessPost },
  ] = useLazyGetPostQuery();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
  });
  const resolver = yupResolver(validationSchema);
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      shortDescription: "",
      description: "",
      article: "",
      categoryId: "",
      tag: "",
      tags: [] as string[],
      bannerId: "",
      files: null,
    },
    resolver,
  });

  useEffect(() => {
    if (id && !isEmpty(id)) {
      getPost(id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (postData) {
      reset({
        ...postData.data,
        categoryId: postData.data.category.id,
        files: postData.data.banner?.downloadUrl as any,
        bannerId: postData.data.banner?.id,
      });

      setTagList(postData.data.tags);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessPost, postData]);

  useEffect(() => {
    if (isSuccessUpload) dataUpload && setValue("bannerId", dataUpload.data.id);
    else if (isErrorUpload) setValue("files", null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorUpload, isSuccessUpload]);

  useEffect(() => {
    if (isSuccessNew || isSuccessUpdate) navigate(`/${type}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessNew, isSuccessUpdate]);

  const onSubmit = (values: any) => {
    isEmpty(values.bannerId) && delete values.bannerId;
    isEmpty(values.description) && delete values.description;
    if (isEmpty(id)) return createPost({ ...values, tags: tagList });
    else return updatePost({ id, values: { ...values, tags: tagList } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <Card variant="outlined" sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field: { name, value, ref, onChange } }) => (
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor={name}>Title</InputLabel>
                      <OutlinedInput
                        tabIndex={0}
                        disabled={Boolean(id && isLoadingPost)}
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
                  name="categoryId"
                  control={control}
                  render={({ field: { name, value, ref, onChange } }) => (
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor={name}>Category</InputLabel>
                      <Select
                        disabled={Boolean(id && isLoadingPost)}
                        tabIndex={1}
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors?.[name]?.message)}
                      >
                        <MenuItem value="">None</MenuItem>
                        {isSuccessLoadCategories &&
                          categoryList?.data?.items.map(
                            (category: CategorySchema) => (
                              <MenuItem key={category.id} value={category.id}>
                                {category.title}
                              </MenuItem>
                            )
                          )}
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
                        disabled={Boolean(id && isLoadingPost)}
                        tabIndex={2}
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
              {type === "news" && (
                <Grid item xs={12}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field: { name, ref, value, onChange } }) => (
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor={name}>Description</InputLabel>
                        <OutlinedInput
                          tabIndex={3}
                          disabled={Boolean(id && isLoadingPost)}
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
              )}
              <Grid item xs={12}>
                <Controller
                  name="article"
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="article">Article</InputLabel>
                      <TextEditor
                        value={
                          !isEmpty(id) && postData ? postData.data.article : ""
                        }
                        onChange={(text) => setValue(name, text)}
                      />
                    </Stack>
                  )}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card variant="outlined" sx={{ p: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack spacing={1.25}>
                  <Controller
                    name="tag"
                    control={control}
                    render={({ field: { name, ref, value, onChange } }) => (
                      <>
                        <Stack spacing={1.25}>
                          <InputLabel htmlFor="article">tags</InputLabel>
                          <Stack direction="row">
                            <OutlinedInput
                              tabIndex={5}
                              disabled={Boolean(id && isLoadingPost)}
                              name={name}
                              id={name}
                              fullWidth
                              ref={ref}
                              value={value}
                              onChange={onChange}
                            />
                            <Button
                              variant="contained"
                              color="secondary"
                              sx={{
                                bgcolor: theme.palette.secondary.light,
                                borderRadius: "0 4px 4px 0",
                              }}
                              onClick={() => {
                                const duplicate =
                                  tagList &&
                                  tagList.filter(
                                    (tag: string) => tag === value
                                  );
                                if (duplicate && duplicate.length > 0) {
                                  dispatch(
                                    openSnackbar({
                                      open: true,
                                      message: "Duplicate Warning",
                                      variant: "alert",
                                      alert: {
                                        color: "warning",
                                      },
                                      close: false,
                                    })
                                  );
                                } else {
                                  const newList = [...tagList];
                                  newList.push(value);
                                  setTagList(newList);
                                }
                                setValue(name, "");
                              }}
                            >
                              <AddIcon />
                            </Button>
                          </Stack>
                          {errors?.[name]?.message && (
                            <FormHelperText error>
                              {errors[name]?.message}
                            </FormHelperText>
                          )}
                        </Stack>
                        <Stack direction="row" spacing={1.25} flexWrap="wrap">
                          {tagList &&
                            tagList.map((tag: string, key: number) => (
                              <Chip
                                key={key}
                                label={tag}
                                variant="light"
                                color="primary"
                                sx={{ mb: 1 }}
                                onDelete={(e: any) => {
                                  setTagList(
                                    (tags) =>
                                      tags &&
                                      tags.filter((tag, index) => index !== key)
                                  );
                                }}
                              />
                            ))}
                        </Stack>
                      </>
                    )}
                  />
                </Stack>
              </Grid>
              {type === "news" && (
                <Grid item xs={12}>
                  <Controller
                    name="files"
                    control={control}
                    render={({ field: { name, value, ref, onChange } }) => (
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="article">Image</InputLabel>
                        <SingleFileUpload
                          file={value}
                          disabled={isLoadingUpload}
                          maxSize={5000000}
                          loading={
                            isLoadingNew || isLoadingUpload || isLoadingUpdate
                          }
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
                </Grid>
              )}
            </Grid>
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

export default PostForm;
