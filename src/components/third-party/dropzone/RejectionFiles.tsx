// material-ui
import { alpha } from '@mui/material/styles';
import { Box, Paper, Typography } from '@mui/material';

// third-party
import { ErrorCode, FileRejection } from 'react-dropzone';

// utils
import getDropzoneData from 'utils/getDropzoneData';
import { imageSizeNormalize, normalizeContent } from '../../../utils/helpers/main';

// ==============================|| DROPZONE - REJECTION FILES ||============================== //

type Props = {
  fileRejections: FileRejection[];
};

export default function RejectionFiles({ fileRejections }: Props) {

  const getErrorMessage = (code: string, type = "") => {
    switch (code) {
      case ErrorCode.FileInvalidType:
        return `File Invalid Type`;
      case ErrorCode.FileTooLarge:
        return `File TooLarge`;
      case ErrorCode.FileTooSmall:
        return `File TooSmall`;
      case ErrorCode.TooManyFiles:
        return `Too ManyFiles`;
      default:
        return "";
    }
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: 'error.light',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08)
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size } = getDropzoneData(file);

        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path}
            </Typography>
            <Typography variant="subtitle2" noWrap>
              {size ? normalizeContent(imageSizeNormalize(size), 'in') : ''}
            </Typography>

            {errors.map((error) => (
              <Box key={error.code} component="li" sx={{ typography: 'caption' }}>
                {getErrorMessage(error.code)}
              </Box>
            ))}
          </Box>
        );
      })}
    </Paper>
  );
}
