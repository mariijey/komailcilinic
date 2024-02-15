// material-ui
import { CardMedia, Divider, Skeleton, Stack } from "@mui/material";
import { Grid, Typography } from "@mui/material";

function Features({
  isLoading,
  features,
}: {
  isLoading: boolean;
  features: any;
}) {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      {" "}
      {isLoading
        ? ["", "", "", ""].map((item, key) => (
            <Grid item xs={6} sm={4} key={key} alignSelf="center">
              <Stack direction="row" alignItems="center" spacing={1.25}>
                <Skeleton sx={{ width: "20px" }} />
                <Skeleton sx={{ width: "100px" }} />
              </Stack>
            </Grid>
          ))
        : features.map((feature: any, key: number) => (
            <Grid item xs={6} sm={4} key={key}>
              <Stack direction="row" alignItems="center" spacing={1.25}>
                <CardMedia
                  component="img"
                  image={feature.icon.downloadUrl}
                  title={feature.title}
                  sx={{ maxWidth: "20px" }}
                />
                <Typography>{feature?.title}</Typography>
              </Stack>
            </Grid>
          ))}
    </Grid>
  );
}

export default Features;
