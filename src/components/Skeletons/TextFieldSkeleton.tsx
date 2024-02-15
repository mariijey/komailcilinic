import { Box, Skeleton, Stack } from '@mui/material';
import React, { ReactElement } from 'react';

interface WithLoadingProps {
  loading: boolean;
  noLabelLoading?: boolean;
}

const TextFieldSkeleton = ({ noLabelLoading }: Partial<WithLoadingProps>) => {
  return (
    <Stack spacing={1}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: 1
        }}
      >
        {!noLabelLoading && (
          <Skeleton
            component={'div'}
            variant={'rectangular'}
            width={'35%'}
            height={20}
            sx={{
              borderRadius: '4px',
              mb: '8px'
            }}
          />
        )}
        <Skeleton component={'div'} variant={'rectangular'} width={'100%'} height={41} sx={{ borderRadius: '4px' }} />
      </Box>
    </Stack>
  );
};

export const withTextFieldSkeleton =
  <P extends object>(WrappedComponent: React.ComponentType<P> | React.FunctionComponent<P>): React.FC<P & WithLoadingProps> =>
  ({ loading = false, noLabelLoading = false, ...props }: WithLoadingProps) =>
    loading ? <TextFieldSkeleton noLabelLoading={noLabelLoading} /> : <WrappedComponent {...(props as P)} />;

type TextFieldSkeletonProps = {
  children: ReactElement | null;
  loading?: boolean;
  noLabelLoading?: boolean;
};

export const InputFieldSkeleton = ({ loading, noLabelLoading, children }: TextFieldSkeletonProps) => {
  if (loading) {
    return <TextFieldSkeleton noLabelLoading={noLabelLoading} />;
  }
  return children;
};
