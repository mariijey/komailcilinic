import {
  Box,
  Divider,
  Grid,
  Stack,
  Tabs,
  Typography,
  Tab,
  CardMedia,
} from "@mui/material";
import MainCard from "components/MainCard";
import { Link } from "react-router-dom";
import { SyntheticEvent, useState } from "react";
import { usePropertyQuery } from "store/api/propertyManagement";
import ImageSlide from "./ImageSlide";
import Information from "./Information";
import Features from "./Features";
import LandInfos from "./LandInfos";
import MapView from "./MapView";
import defaultImage from "assets/svg/default-property.svg";

import { TabsProps } from "types/e-commerce";

type Props = {
  id: number | string;
};

function TabPanel({ children, value, index, ...other }: TabsProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-details-tabpanel-${index}`}
      aria-labelledby={`product-details-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `product-details-tab-${index}`,
    "aria-controls": `product-details-tabpanel-${index}`,
  };
}

const Property = ({ id }: Props) => {
  const { data, isLoading, isSuccess, isError } = usePropertyQuery(id);

  // product description tabs
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MainCard>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                {!isLoading &&
                (!data?.data?.files || !(data?.data?.files.length > 0)) ? (
                  <CardMedia
                    component="img"
                    image={defaultImage}
                    title="property has no image"
                    sx={{ width: "100%", height: "auto" }}
                  />
                ) : (
                  <ImageSlide
                    isLoading={isLoading}
                    images={data?.data?.files.map(
                      (item: any) => item.file.downloadUrl
                    )}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Information
                  isLoading={isLoading}
                  property={{
                    user: data?.data?.user,
                    id: data?.data.id,
                    name: data?.data.title,
                    bedNumber: data?.data?.bedNumber,
                    bathroomNumber: data?.data.bathroomNumber,
                    monthlyRent: data?.data.monthlyRent,
                    currency: data?.data.currency,
                    status: data?.data.status,
                    buildDate: data?.data.buildDate,
                    maxAllowedTenants: data?.data.maxAllowedTenants,
                    deposit: data?.data.deposit,
                    furnishing: data?.data.furnishing,
                  }}
                />
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={7} xl={8}>
          <MainCard>
            <Stack spacing={3} sx={{ minHeight: "300px" }}>
              <Stack>
                <Tabs
                  value={value}
                  indicatorColor="primary"
                  onChange={handleChange}
                  aria-label="product description tabs example"
                  variant="scrollable"
                >
                  <Tab
                    component={Link}
                    to="#"
                    label="Features"
                    {...a11yProps(0)}
                  />
                  <Tab
                    component={Link}
                    to="#"
                    label="Land Information"
                    {...a11yProps(1)}
                  />
                  <Tab
                    component={Link}
                    to="#"
                    label="Overview"
                    {...a11yProps(2)}
                  />
                </Tabs>
                <Divider />
              </Stack>
              <TabPanel value={value} index={0}>
                <Features
                  isLoading={isLoading}
                  features={data?.data?.features}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <LandInfos isLoading={isLoading} data={data?.data} />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Stack spacing={2.5}>
                  <Typography color="textSecondary">
                    {data?.data.description}
                  </Typography>
                </Stack>
              </TabPanel>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} xl={4} sx={{ position: "relative" }}>
          <MainCard
            title={"Google Map"}
            sx={{
              height: "calc(100% - 16px)",
              position: { xs: "relative", md: "absolute" },
              top: "16px",
              left: { xs: 0, md: 16 },
              right: 0,
            }}
            content={false}
          >
            <MapView
              isLoading={isLoading}
              zoom={18}
              center={[
                Number(data?.data.address.latitude),
                Number(data?.data.address.longitude),
              ]}
              bounds={{
                north: 51.522,
                south: 51.484,
                east: -0.046,
                west: -0.136,
              }}
            />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default Property;
