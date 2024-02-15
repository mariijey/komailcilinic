import { Stack, Typography } from "@mui/material";
import { Contract } from "types/contractManagment";

const Agreement = ({ data }: { data?: Contract }) => {
  return (
    <Stack mt={2}>
      <Item
        label={"Property Manager"}
        value={data?.agencyInfo.manager ?? "-"}
      />
      <Item label={"Agent Name"} value={data?.agencyInfo.name ?? "-"} />
      <Item label={"address"} value={data?.agencyInfo.address ?? "-"} />
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
