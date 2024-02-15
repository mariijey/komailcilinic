import { Stack, Typography } from "@mui/material";
import { Contract } from "types/contractManagment";
import { getPrice, spiltUnderLine } from "utils/helpers/main";

const Agreement = ({ data }: { data?: Contract }) => {
    return (
      <Stack mt={2}>
        <Item label={"deposit"} value={getPrice(data?.deposit)} />
        <Item label={"Monthly Rent"} value={getPrice(data?.monthlyRent)} />
        <Item
          label={"Protect Deposit Scheme"}
          value={spiltUnderLine(data?.protectDepositScheme)}
        />
        <Item
          label={"Rent Duration Month"}
          value={Math.fround(Number(data?.rentDurationDays) / 30) + " Month"}
        />
        <Item label={"description"} value={data?.description} />
      </Stack>
    );
};

export default Agreement;

const Item = ({ value, label }: { value?: string | number; label: string }) => {
    return (
        <Stack direction="row" spacing={0.5} my={1}>
            <Typography variant="h6">{label}:</Typography>
            <Typography variant="h6">{value}</Typography>
        </Stack>
    );
};
