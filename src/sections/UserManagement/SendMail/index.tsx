import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Switch } from "@mui/material";
import {
  Grid,
  InputLabel,
  Stack,
  OutlinedInput,
  FormHelperText,
  FormControlLabel,
} from "@mui/material";
import MainCard from "components/MainCard";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  useSendMailMutation,
  useSendPublicEmailMutation,
} from "store/api/userManagement";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";

type Props = {
  receiver?: string;
  onClose?: () => void;
};
function SendMail({ receiver, onClose }: Props) {
  const location = useLocation();

  const [isPublicEmail, setIsPublicEmail] = useState<boolean>(false);

  const [mailReq, { isLoading, isSuccess }] = useSendMailMutation();

  const [
    publicMailReq,
    { isLoading: isLoadingPublic, isSuccess: isSuccessPublic },
  ] = useSendPublicEmailMutation();

  const resolver = yupResolver<any>(
    Yup.object().shape({
      email: Yup.string().email().required(),
      subject: Yup.string().min(3).required(),
      text: Yup.string().min(3).required(),
    })
  );
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: isEmpty(receiver) ? location.search.split("=")[1] : receiver,
      subject: "",
      text: "",
    },
    resolver,
  });

  useEffect(() => {
    if (isSuccess || isSuccessPublic) {
      reset({
        email: "",
        subject: "",
        text: "",
      });
      onClose?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isSuccessPublic]);

  const onSubmit = (values: any) => {
    if (isPublicEmail && isEmpty(receiver)) {
      publicMailReq({
        subject: values.subject,
        text: values.text,
      });
    } else mailReq(values);
  };

  return (
    <MainCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {isEmpty(receiver) && (
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isPublicEmail}
                    onChange={({
                      target,
                    }: {
                      target: { checked: boolean };
                    }) => {
                      target.checked
                        ? setValue("email", "test@test.com")
                        : setValue("email", "");
                      setIsPublicEmail(target.checked);
                    }}
                    name="isPublic"
                  />
                }
                label="Send Public Email"
              />
            </Grid>
          )}
          {!isPublicEmail && (
            <Grid item xs={12}>
              <Controller
                control={control}
                name="email"
                render={({ field: { name, ref, value, onChange } }) => (
                  <Stack spacing={1}>
                    <InputLabel htmlFor={name}>Email</InputLabel>
                    <OutlinedInput
                      id={name}
                      type="text"
                      placeholder="apollon@apollon.com"
                      name={name}
                      ref={ref}
                      value={value}
                      disabled={!isEmpty(receiver)}
                      autoFocus={isEmpty(receiver)}
                      onChange={onChange}
                      fullWidth
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
          <Grid xs={12} item>
            <Controller
              control={control}
              name="subject"
              render={({ field: { name, ref, value, onChange } }) => (
                <Stack spacing={1}>
                  <InputLabel htmlFor={name}>Subject</InputLabel>
                  <OutlinedInput
                    id={name}
                    type="text"
                    name={name}
                    ref={ref}
                    value={value}
                    onChange={onChange}
                    autoFocus={!isEmpty(receiver)}
                    fullWidth
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
          <Grid xs={12} item>
            <Controller
              control={control}
              name="text"
              render={({ field: { name, ref, value, onChange } }) => (
                <Stack spacing={1}>
                  <InputLabel htmlFor={name}>Text</InputLabel>
                  <OutlinedInput
                    multiline
                    id={name}
                    type="text"
                    name={name}
                    ref={ref}
                    value={value}
                    onChange={onChange}
                    fullWidth
                    rows={20}
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
          <Grid xs={12} item>
            <LoadingButton
              loading={isLoading || isLoadingPublic}
              variant="contained"
              type="submit"
            >
              Submit
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </MainCard>
  );
}

export default SendMail;
