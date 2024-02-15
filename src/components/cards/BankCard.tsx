import React from "react";
import { BankAccountInfo } from "types/contractManagment";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { InputLabel, OutlinedInput, FormHelperText } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";

type BankCardFormValues = {
  account: string;
  sort_code: string;
  iban: string;
  name: string;
};

const BankCard = ({
  data,
  title,
  onClick,
  loading,
}: {
  data?: BankAccountInfo;
  title: string;
  onClick: (arg: BankAccountInfo) => void;
  loading?:boolean;
}) => {
  const resolver = yupResolver<Yup.AnyObjectSchema>(
    Yup.object().shape({
      iban: Yup.string().required(),
      account: Yup.string().required(),
      sort_code: Yup.string().required(),
      name: Yup.string().required(),
    })
  );

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BankCardFormValues>({
    mode: "onChange",
    defaultValues: {
      iban: data?.iban || "",
      account: data?.bacs?.account || "",
      sort_code: data?.bacs?.sort_code || "",
      name: data?.name || "",
    },
    resolver,
  });

  const handleClick = (values: BankCardFormValues) => {
    onClick({
      iban: values.iban,
      name: values.name,
      bacs: {
        account: values.account,
        sort_code: values.sort_code,
      },
    });
  };

  //   {
  //     "iban": "dk8bDrbbQACpLNBNGkvxf9k7peMk1PTJqVeBA",
  //     "name": "Abbey Bickmarsh Caddington",
  //     "bacs": {
  //         "account": "80001111",
  //         "sort_code": "040004"
  //     }
  // }

  return (
    <Box padding={2} border={"1px solid #bfbfbf63"} borderRadius={1}>
      <Typography variant="h5" paddingBottom={2} color={"#595959"}>
        {title}
      </Typography>
      <form onSubmit={handleSubmit(handleClick)}>
        <Grid xs={12}>
          <Controller
            control={control}
            name="name"
            render={({ field: { name, ref, value, onChange } }) => (
              <Stack spacing={1}>
                <InputLabel htmlFor={name}>Name</InputLabel>
                <OutlinedInput
                  id={name}
                  type="text"
                  placeholder="Abbey Bickmarsh Caddington"
                  name={name}
                  ref={ref}
                  value={value}
                  //   disabled={!isEmpty(receiver)}
                  //   autoFocus={isEmpty(receiver)}
                  onChange={onChange}
                  fullWidth
                  error={Boolean(errors?.[name]?.message)}
                />
                {errors?.[name]?.message && (
                  <FormHelperText error>{errors[name]?.message}</FormHelperText>
                )}
              </Stack>
            )}
          />
        </Grid>
        <Grid xs={12} marginY={1.5}>
          <Controller
            control={control}
            name="iban"
            render={({ field: { name, ref, value, onChange } }) => (
              <Stack spacing={1}>
                <InputLabel htmlFor={name}>Iban</InputLabel>
                <OutlinedInput
                  id={name}
                  type="text"
                  placeholder="GB23MONZ04000480000000"
                  name={name}
                  ref={ref}
                  value={value}
                  //   disabled={!isEmpty(receiver)}
                  //   autoFocus={isEmpty(receiver)}
                  onChange={onChange}
                  fullWidth
                  error={Boolean(errors?.[name]?.message)}
                />
                {errors?.[name]?.message && (
                  <FormHelperText error>{errors[name]?.message}</FormHelperText>
                )}
              </Stack>
            )}
          />
        </Grid>
        <Grid container spacing={2}>
          <Grid xs={6} item>
            <Controller
              control={control}
              name="account"
              render={({ field: { name, ref, value, onChange } }) => (
                <Stack spacing={1}>
                  <InputLabel htmlFor={name}>Account</InputLabel>
                  <OutlinedInput
                    id={name}
                    type="text"
                    placeholder="80001111"
                    name={name}
                    ref={ref}
                    value={value}
                    //   disabled={!isEmpty(receiver)}
                    //   autoFocus={isEmpty(receiver)}
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
          <Grid xs={6} item>
            <Controller
              control={control}
              name="sort_code"
              render={({ field: { name, ref, value, onChange } }) => (
                <Stack spacing={1}>
                  <InputLabel htmlFor={name}>Sort Code</InputLabel>
                  <OutlinedInput
                    id={name}
                    type="text"
                    placeholder="040004"
                    name={name}
                    ref={ref}
                    value={value}
                    //   disabled={!isEmpty(receiver)}
                    //   autoFocus={isEmpty(receiver)}
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
        </Grid>
        <Grid xs={12} item marginTop={1.5}>
          <LoadingButton variant="contained" type="submit" loading={loading}>
            Submit
          </LoadingButton>
        </Grid>
      </form>
    </Box>
  );
};

export default BankCard;
