// material-ui
import { Typography, Stack, CardMedia } from '@mui/material';

// assets
import UploadCover from 'assets/images/upload/upload.svg';

// ==============================|| UPLOAD - PLACEHOLDER ||============================== //

export default function PlaceholderContent() {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction={{ xs: "column", md: "row" }}
      sx={{ width: 1, textAlign: { xs: "center", md: "left" } }}
    >
      <CardMedia component="img" image={UploadCover} sx={{ width: 150 }} />
      <Stack sx={{ p: 3 }} spacing={1}>
        <Typography variant="h5">Drag and Drop or Select file</Typography>

        <Typography color="secondary">Drop file here</Typography>
      </Stack>
    </Stack>
  );
}
