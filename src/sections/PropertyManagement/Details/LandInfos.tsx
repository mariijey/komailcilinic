// material-ui
import { Divider, Grid, Skeleton, Stack, Typography } from "@mui/material";

// ==============================|| PRODUCT DETAILS - SPECIFICATIONS ||============================== //

function LandInfos({ isLoading, data }: { isLoading: boolean; data: any }) {

  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12} md={6}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <Typography variant="h5">Land</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography color="textSecondary">LandArea:</Typography>
          </Grid>
          <Grid item xs={6}>
            {isLoading ? (
              <Skeleton />
            ) : (
              <Typography>{data?.landArea}</Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            <Typography color="textSecondary">BuildDate:</Typography>
          </Grid>
          <Grid item xs={6}>
            {isLoading ? (
              <Skeleton />
            ) : (
              <Typography>
                {new Date(data.buildDate).toLocaleDateString()}
              </Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            <Typography color="textSecondary">IsNewBuilding:</Typography>
          </Grid>
          <Grid item xs={6}>
            {isLoading ? (
              <Skeleton />
            ) : (
              <Typography>{data.isNewBuilding ? "YES" : "NO"}</Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <Typography variant="h5">Landlord</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography color="textSecondary">Name:</Typography>
          </Grid>
          <Grid item xs={6}>
            {isLoading ? (
              <Skeleton />
            ) : (
              <Typography>{data.landlordName}</Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            <Typography color="textSecondary">Phone:</Typography>
          </Grid>
          <Grid item xs={6}>
            {isLoading ? (
              <Skeleton />
            ) : (
              <Typography>{data.landlordPhone}</Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            <Typography color="textSecondary">CreatedAt:</Typography>
          </Grid>
          <Grid item xs={6}>
            {isLoading ? (
              <Skeleton />
            ) : (
              <Typography>
                {new Date(data.createdAt).toLocaleDateString()}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <Typography variant="h5">Address</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" spacing={1.5}>
              <Typography color="textSecondary">CountryName:</Typography>
              {isLoading ? (
                <Skeleton />
              ) : (
                <Typography>{data.address.countryName}</Typography>
              )}
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" spacing={1.5}>
              <Typography color="textSecondary">StateName:</Typography>
              {isLoading ? (
                <Skeleton />
              ) : (
                <Typography>{data.address.stateName}</Typography>
              )}
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" spacing={1.5}>
              <Typography color="textSecondary">CityName:</Typography>
              {isLoading ? (
                <Skeleton />
              ) : (
                <Typography>{data.address.cityName}</Typography>
              )}
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" spacing={1.5}>
              <Typography color="textSecondary">Postcode:</Typography>
              {isLoading ? (
                <Skeleton />
              ) : (
                <Typography>{data.address.postcode}</Typography>
              )}
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" spacing={1.5}>
              <Typography color="textSecondary">First Address:</Typography>
              {isLoading ? (
                <Skeleton />
              ) : (
                <Typography>{data.address.address_1}</Typography>
              )}
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" spacing={1.5}>
              <Typography color="textSecondary">
                Second Address:
              </Typography>
              {isLoading ? (
                <Skeleton />
              ) : (
                <Typography>{data.address.address_2}</Typography>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LandInfos;
