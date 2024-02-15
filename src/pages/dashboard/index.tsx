import React from "react";
import { Box } from "@mui/system";
import { useGetDashboardQuery } from "store/api/dashboard";
import { Grid, Skeleton, Stack } from "@mui/material";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import PaidIcon from "@mui/icons-material/Paid";
import { getPrice } from "utils/helpers/main";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";

const Index = () => {
  const { data } = useGetDashboardQuery();

  const info = [
    { id: "totalUsers", label: "Total Users", icon: PeopleOutlineIcon },
    { id: "todayUsers", label: "Today Users", icon: PeopleOutlineIcon },
    {
      id: "totalListedProperties",
      label: "Total Listed Properties",
      icon: HomeWorkIcon,
    },
    {
      id: "totalPropertyRequests",
      label: "Total Property Requests",
      icon: HomeWorkIcon,
    },
    {
      id: "completedContracts",
      label: "Completed Contracts",
      icon: HistoryEduIcon,
    },
    {
      id: "totalDepositsAmount",
      label: "Total Deposits Amount",
      icon: PaidIcon,
    },
    {
      id: "contactUsMessages",
      label: "Contact Us Messages",
      icon: ContactMailIcon,
    },
  ];

  return (
    <Grid container>
      {data?.data ? (
        <>
          {info.map((item, key: number) => (
            <Item
              key={key}
              label={item.label}
              value={
                item.id
                  ? item.id === "totalDepositsAmount"
                    ? getPrice(data.data[item.id])
                    : data.data[item.id]
                  : ""
              }
              icon={item.icon}
            />
          ))}
        </>
      ) : (
        <>
          <ItemLoading />
          <ItemLoading />
          <ItemLoading />
          <ItemLoading />
          <ItemLoading />
          <ItemLoading />
        </>
      )}
    </Grid>
  );
};

export default Index;

const Item = ({
  label,
  value,
  icon,
}: {
  label?: string;
  value?: string | number;
  icon: any;
}) => {
  const Icon = icon;
  return (
    <Grid item xs={6} sm={4}>
      <Card variant="outlined" sx={{ px: 2, py: 3, m: 1 }}>
        <Stack direction="column" alignItems="center" spacing={2}>
          <Icon fontSize="large" />
          <Typography variant="h6">
            {label} : {value}
          </Typography>
        </Stack>
      </Card>
    </Grid>
  );
};

const ItemLoading = () => {
  return (
    <Grid item xs={6} sm={4} className="dashboard-item">
      <Skeleton width={40} height={60} />
      <Skeleton width={150} />
    </Grid>
  );
};
