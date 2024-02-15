import {
  Dialog,
  Grid,
  Box,
  Avatar,
  Skeleton,
  Stack,
  InputLabel,
  Typography,
  TextField,
  FormHelperText,
  OutlinedInput,
  Divider,
  Button,
} from "@mui/material";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { UserItemSchema } from "types/userManagement";
import { useUploadFileMutation } from "store/api/fileManagement";
import { useUserUpdateMutation } from "store/api/userManagement";
const avatarImage = require.context("assets/images/users", true);

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  data: UserItemSchema | undefined;
};

const ProfileForm = ({ data, isOpen, handleClose }: Props) => {
  const theme = useTheme();
  const [avatar, setAvatar] = useState<string | undefined>(
    avatarImage(`./default.png`).default
  );

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

  const [isLoading, setIsLoading] = useState(false);

  const resolver = yupResolver<any>(
    Yup.object().shape({
      name: Yup.string().max(255),
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
      avatarId: "",
      website: "",
      files: "",
      social: {
        twitter: "",
        youtube: "",
        facebook: "",
        instagram: "",
      },
    },
    resolver,
  });

  useEffect(() => {
    setAvatar(data?.avatar?.downloadUrl);
    reset({ website: data?.website, social: data?.social });
  }, [data, reset]);

  useEffect(() => {
    if (isSuccessUpload)
      dataUpload && setValue("avatarId", dataUpload?.data?.id);
    else if (isErrorUpload) setValue("files", "");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorUpload, isSuccessUpload]);

  useEffect(() => {
    if (isLoadingUpload || LoadingUpdateData) setIsLoading(true);
    else setIsLoading(false);
  }, [isLoadingUpload, LoadingUpdateData]);

  const onClickAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    const url = URL.createObjectURL(selectedFile as File);
    setAvatar(url);
    const formData = new FormData();
    formData.append("file", selectedFile as File);
    uploadFile(formData);
  };

  const onSubmit = async (values: any) => {
    delete values.files;
    await updateProfile({
      id: data?.id,
      data: values,
    }).then(() => handleClose());
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="files"
                control={control}
                render={({ field: { name, value, onChange } }) => (
                  <Stack spacing={1.25} alignItems="center">
                    <InputLabel
                      htmlFor="change-avatar"
                      sx={{
                        position: "relative",
                        borderRadius: "50%",
                        overflow: "hidden",
                        "&:hover .MuiBox-root": { opacity: 1 },
                        cursor: "pointer",
                      }}
                    >
                      {isLoading ? (
                        <Skeleton variant="circular" width={124} height={124} />
                      ) : (
                        <Avatar
                          alt="Avatar 1"
                          src={avatar}
                          sx={{ width: 150, height: 150, border: "1px dashed" }}
                        />
                      )}

                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, .75)"
                              : "rgba(0,0,0,.65)",
                          width: "100%",
                          height: "100%",
                          opacity: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Stack spacing={0.5} alignItems="center">
                          <FontAwesomeIcon
                            icon={faCamera}
                            style={{
                              color: theme.palette.secondary.lighter,
                              fontSize: "2rem",
                            }}
                          />

                          <Typography sx={{ color: "secondary.lighter" }}>
                            Upload Avatar
                          </Typography>
                        </Stack>
                      </Box>
                    </InputLabel>
                    <TextField
                      type="file"
                      id="change-avatar"
                      label="Outlined"
                      variant="outlined"
                      sx={{ display: "none" }}
                      onChange={onClickAvatar}
                    />
                  </Stack>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="website"
                control={control}
                render={({ field: { name, value, ref, onChange } }) => {
                  return (
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor={name}>Website</InputLabel>
                      <OutlinedInput
                        tabIndex={2}
                        id={name}
                        value={value}
                        name={name}
                        ref={ref}
                        onChange={onChange}
                        fullWidth
                        error={Boolean(errors?.[name]?.message)}
                      />

                      <FormHelperText error={Boolean(errors?.[name]?.message)}>
                        {errors?.[name]?.message}
                      </FormHelperText>
                    </Stack>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="social.twitter"
                control={control}
                render={({ field: { name, value, ref, onChange } }) => {
                  return (
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor={name}>Twitter</InputLabel>
                      <OutlinedInput
                        tabIndex={3}
                        id={name}
                        value={value}
                        name={name}
                        ref={ref}
                        onChange={onChange}
                        fullWidth
                        startAdornment={
                          <Typography
                            component="span"
                            sx={{ px: 1, py: 0, fontSize: ".7rem" }}
                          >
                            https://twitter.com/
                          </Typography>
                        }
                        error={Boolean(errors?.social?.twitter?.message)}
                      />

                      <FormHelperText
                        error={Boolean(errors?.social?.twitter?.message)}
                      >
                        {errors?.social?.twitter?.message}
                      </FormHelperText>
                    </Stack>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="social.facebook"
                control={control}
                render={({ field: { name, value, ref, onChange } }) => {
                  return (
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor={name}>Facebook</InputLabel>
                      <OutlinedInput
                        tabIndex={4}
                        id={name}
                        value={value}
                        name={name}
                        ref={ref}
                        onChange={onChange}
                        fullWidth
                        startAdornment={
                          <Typography
                            component="span"
                            sx={{ px: 1, py: 0, fontSize: ".7rem" }}
                          >
                            https://facebook.com/
                          </Typography>
                        }
                        error={Boolean(errors?.social?.facebook?.message)}
                      />

                      <FormHelperText
                        error={Boolean(errors?.social?.facebook?.message)}
                      >
                        {errors?.social?.facebook?.message}
                      </FormHelperText>
                    </Stack>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="social.youtube"
                control={control}
                render={({ field: { name, value, ref, onChange } }) => {
                  return (
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor={name}>Youtube</InputLabel>
                      <OutlinedInput
                        tabIndex={5}
                        id={name}
                        value={value}
                        name={name}
                        ref={ref}
                        onChange={onChange}
                        fullWidth
                        startAdornment={
                          <Typography
                            component="span"
                            sx={{ px: 1, py: 0, fontSize: ".7rem" }}
                          >
                            https://youtube.com/@
                          </Typography>
                        }
                        error={Boolean(errors?.social?.youtube?.message)}
                      />

                      <FormHelperText
                        error={Boolean(errors?.social?.youtube?.message)}
                      >
                        {errors?.social?.youtube?.message}
                      </FormHelperText>
                    </Stack>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="social.instagram"
                control={control}
                render={({ field: { name, value, ref, onChange } }) => {
                  return (
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor={name}>Instagram</InputLabel>
                      <OutlinedInput
                        tabIndex={6}
                        id={name}
                        value={value}
                        name={name}
                        ref={ref}
                        onChange={onChange}
                        fullWidth
                        startAdornment={
                          <Typography
                            component="span"
                            sx={{ px: 1, py: 0, fontSize: ".7rem" }}
                          >
                            https://instagram.com/
                          </Typography>
                        }
                        error={Boolean(errors?.social?.instagram?.message)}
                      />

                      <FormHelperText
                        error={Boolean(errors?.social?.instagram?.message)}
                      >
                        {errors?.social?.instagram?.message}
                      </FormHelperText>
                    </Stack>
                  );
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Stack flexDirection="row">
                <LoadingButton
                  variant="contained"
                  loading={isLoading}
                  type="submit"
                >
                  Submit
                </LoadingButton>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleClose}
                  sx={{ ml: 1 }}
                >
                  Cancel
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Dialog>
  );
};

export default ProfileForm;
