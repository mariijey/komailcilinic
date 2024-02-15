import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';

export const RadioButtonSkeleton = () => {
  return (
    <Stack spacing={1}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: 1
        }}
      >
        <Skeleton
          component={'div'}
          variant={'circular'}
          width={17}
          height={17}
          sx={{
            mr: 1
          }}
        />
        <Skeleton component={'div'} variant={'rectangular'} height={20} sx={{ borderRadius: '4px', width: 'calc(100% - 34px)' }} />
      </Box>
    </Stack>
  );
};

interface WithLoadingProps {
  loading: boolean;
}

export const withRadioButtonSkeleton =
  <P extends object>(WrappedComponent: React.ComponentType<P> | React.FunctionComponent<P>): React.FC<P & WithLoadingProps> =>
  ({ loading = false, ...props }: WithLoadingProps) =>
    loading ? <RadioButtonSkeleton /> : <WrappedComponent {...(props as P)} />;
