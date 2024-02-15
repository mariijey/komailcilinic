import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';

export const InfoTextSkeleton = ({ noWrap = true }) => {
  return (
    <Stack spacing={0.5}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: noWrap ? 'row' : 'column',
          alignItems: noWrap ? 'center' : 'flex-start',
          justifyContent: noWrap ? 'flex-start' : 'center',
          width: 1
        }}
      >
        <Skeleton
          component={'div'}
          variant={'rectangular'}
          width={'30%'}
          height={20}
          sx={{
            borderRadius: '4px',
            mr: noWrap ? 1 : 0,
            mb: noWrap ? 0 : 1
          }}
        />
        <Skeleton component={'div'} variant={'rectangular'} width={'70%'} height={20} sx={{ borderRadius: '4px' }} />
      </Box>
    </Stack>
  );
};

interface WithLoadingProps {
  loading: boolean;
  wrap?: boolean;
}

export const withInfoTextSkeleton =
  <P extends object>(WrappedComponent: React.ComponentType<P> | React.FunctionComponent<P>): React.FC<P & WithLoadingProps> =>
  ({ loading = false, wrap = false, ...props }: WithLoadingProps) =>
    loading ? <InfoTextSkeleton noWrap={wrap} /> : <WrappedComponent {...(props as P)} />;
