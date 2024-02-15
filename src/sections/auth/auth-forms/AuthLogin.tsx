import { useState } from "react";
import {
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import useAuth from "hooks/useAuth";
import AnimateButton from "components/@extended/AnimateButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginRequest } from "types/auth";
import PasswordInput from "components/Input/PasswordInput";
import { isEmpty } from "utils/helpers/main";
import ErrorHandler from "components/ErrorHandler";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "config";

const validationSchema = Yup.object().shape({
  NAt_ID: Yup.string().required(),
  // password: Yup.string().required().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH).trim(),
  PaSS_worD: Yup.string().required(),
});

const AuthLogin = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { login } = useAuth();

  const [error, setError] = useState<any>({});

  const resolver = yupResolver(validationSchema);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      NAt_ID: "",
      PaSS_worD: "",
    },
    resolver,
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      // await login(data);
      fetch("https://deepdev.ir/Projects/KomailClinic/Admin/Login_Super.php", {
        method: "post",
        body: JSON.stringify(data),
      }).then((res) => {
        console.log(res);
      });
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <form onSubmit={handleSubmit((d) => onSubmit(d))}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name={"NAt_ID"}
            control={control}
            render={({ field }) => {
              return (
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Email</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="text"
                    value={field.value}
                    name="NAt_ID"
                    ref={field.ref}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    placeholder={"Email"}
                    autoFocus={true}
                    fullWidth
                    error={Boolean(errors?.NAt_ID?.message)}
                  />
                  {errors?.NAt_ID?.message && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email-login"
                    >
                      {errors.NAt_ID?.message}
                    </FormHelperText>
                  )}
                </Stack>
              );
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name={"PaSS_worD"}
            control={control}
            render={({ field }) => {
              return (
                <PasswordInput
                  name="PaSS_worD"
                  value={field.value}
                  setValue={(_, value) => setValue("PaSS_worD", value)}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  error={errors?.PaSS_worD?.message}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={12}>
          {!isEmpty(error) && <ErrorHandler error={error} />}
        </Grid>

        {/* <Grid item xs={12} sx={{ mt: -1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Link variant="h6" component={RouterLink} to="/forgot-password" color="primary">
              {t('auth.doYouForgotPassword')}
            </Link>
          </Stack>
        </Grid> */}
        <Grid item xs={12}>
          <AnimateButton>
            <LoadingButton
              loading={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
            >
              Login
            </LoadingButton>
          </AnimateButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default AuthLogin;
