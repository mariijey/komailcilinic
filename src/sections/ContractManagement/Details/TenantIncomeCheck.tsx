import React from "react";
import { Stack, Typography } from "@mui/material";
import { spiltUnderLine } from "utils/helpers/main";
import { Contract } from "types/contractManagment";

const TenantIncomeCheck = ({ data }: { data?: Contract }) => {
  return (
    <Stack mt={2}>
      <Item
        label={"Tenant Income Check"}
        value={spiltUnderLine(data?.tenantIncomeCheck)}
      />
    </Stack>
  );
};

export default TenantIncomeCheck;

const Item = ({ value, label }: { value?: string | number; label: string }) => {
  return (
    <Stack direction="row" spacing={0.5} my={1}>
      <Typography variant="h6">{label}:</Typography>
      <Typography variant="h6">{value}</Typography>
    </Stack>
  );
};
