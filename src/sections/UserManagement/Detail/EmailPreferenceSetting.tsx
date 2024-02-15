import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Switch,
  Stack,
  Typography,
  Box,
  Grid,
  Skeleton,
  Divider,
} from "@mui/material";
import MainCard from "components/MainCard";
import { Params, useParams } from "react-router";
import {
  useEmailSettingsMutation,
  useGetUserQuery,
} from "store/api/userManagement";

type Props = {};

const EmailPreferenceSetting = (props: Props) => {
  const params = useParams() as Params;
  const id: string = params.id as string;
  const [values, setValues] = useState<{
    news: boolean;
    newProperties: boolean;
    newRequests: boolean;
  }>({
    news: false,
    newProperties: false,
    newRequests: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data, isLoading: isLoadingGetData, isSuccess } = useGetUserQuery(id);
  const [updateSettings, { isLoading: isLoadingUpdate }] =
    useEmailSettingsMutation();

  const handleChange = (e: any) => {
    const checked = e.target.checked;
    const name = e.target.name;
    setValues({ ...values, [name]: checked });
  };

  useEffect(() => {
    data?.data?.emailSettings && setValues(data.data.emailSettings);
  }, [data, isSuccess]);
  useEffect(() => {
    if (isLoadingGetData || isLoadingUpdate) setIsLoading(true);
    else setIsLoading(false);
  }, [isLoadingGetData, isLoadingUpdate]);

  return (
    <MainCard content={false} title={"Email Preference Setting"} sx={{ mb: 1 }}>
      <Box sx={{ p: 2.5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>{"Recent News"}</Box>
              {isLoading ? (
                <Skeleton width="100px" />
              ) : (
                <Switch
                  checked={values.news}
                  name="news"
                  onChange={handleChange}
                />
              )}
            </Stack>
            <Stack>
              <Typography variant="subtitle2" color="secondary.dark">
                New news will be emailed to you via the entered email.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>{"Recent Properties"}</Box>
              {isLoading ? (
                <Skeleton width="100px" />
              ) : (
                <Switch
                  checked={values.newProperties}
                  name="newProperties"
                  onChange={handleChange}
                />
              )}
            </Stack>
            <Stack>
              <Typography variant="subtitle2" color="secondary.dark">
                Emails will be sent to inform you of the status of rental
                requests and contract stages.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>{"Requests Of House"}</Box>
              {isLoading ? (
                <Skeleton width="100px" />
              ) : (
                <Switch
                  checked={values.newRequests}
                  name="newRequests"
                  onChange={handleChange}
                />
              )}
            </Stack>
            <Stack>
              <Typography variant="subtitle2" color="secondary.dark">
                The request that tenants sent to house of user will be emailed
                to user via the entered email
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1.25} direction="row" justifyContent="flex-end">
              <LoadingButton
                loading={isLoading}
                variant="contained"
                onClick={() => updateSettings({ id, data: values })}
              >
                Save
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default EmailPreferenceSetting;
