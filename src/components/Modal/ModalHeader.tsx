import { Box, IconButton, Typography } from '@mui/material';
import { CloseOutlined } from '@ant-design/icons';

type Props = {
  title?: string;
  disabled?: boolean;
  handleClose?: () => void;
};

export const ModalNormalHeader = ({ title = '', handleClose, disabled = false }: Props) => {
  return (
    <>
      <Box
        justifyContent="space-between"
        alignItems="center"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid {theme.palette.divider}'
        }}
      >
        <Typography variant={'h5'}>{title}</Typography>
        <Box>
          <IconButton disabled={disabled} color="secondary" onClick={handleClose}>
            <CloseOutlined />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};
