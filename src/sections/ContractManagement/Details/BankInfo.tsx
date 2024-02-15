import React, { useState } from "react";
import { Contract, BankAccountInfo } from "types/contractManagment";
import BankCard from "components/cards/BankCard";
import { Grid } from "@mui/material";
import { useSetBankAccountMutation } from "store/api/contractManagement";
import { useParams } from "react-router-dom";

const BankInfo = ({ data }: { data?: Contract }) => {
  const { id } = useParams();
  const [setLandlordAccount, { isLoading }] = useSetBankAccountMutation();
  const [selected, setSelected] = useState<null | "tenant" | "landlord">(null);

  const handleLandlordAccount = (value: BankAccountInfo) => {
    setSelected("landlord");
    setLandlordAccount({
      data: value,
      url: id + "/bank-info/set-landlord-bank-account",
    });
  };

  // const handleTenantAccount = (value: BankAccountInfo) => {
  //   setSelected("tenant");
  //   setLandlordAccount({
  //     data: value,
  //     url: id + "/bank-info/set-tenant-bank-account",
  //   });
  // };

  return (
    <Grid container spacing={0} gap={3} marginBottom={2} marginTop={4}>
      <Grid xs={4}>
        <BankCard
          data={data?.landlordBankAccountInfo}
          title="Landlord bank info"
          onClick={handleLandlordAccount}
          loading={isLoading && selected === "landlord"}
        />
      </Grid>
      {/* <Grid xs={4}>
        <BankCard
          data={data?.tenantBankAccountInfo}
          title="Tenant bank info"
          onClick={handleTenantAccount}
          loading={isLoading && selected === "tenant"}
        />
      </Grid> */}
    </Grid>
  );
};

export default BankInfo;
