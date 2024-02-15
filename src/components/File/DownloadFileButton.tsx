import React, { forwardRef, Ref } from 'react';
import { openSnackbar } from '../../store/reducers/snackbar';
import { useLazyDownloadFileQuery } from '../../store/api/fileManagement';
import { useDispatch } from 'react-redux';
import LoadingButton, { Props as LoadingButtonProps } from '../@extended/LoadingButton';

interface Props extends LoadingButtonProps {
  token: string;
}

const DownloadFileButton = forwardRef(({ token, children, ...others }: Props, ref: Ref<HTMLButtonElement>) => {
  const dispatch = useDispatch();
  const [downloadFile, { isLoading }] = useLazyDownloadFileQuery();

  const download = async () => {
    try {
      const response = await downloadFile(token);
      const blob = response?.data && new Blob([response.data], { type: response.data.type });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    } catch (err) {
      dispatch(
        openSnackbar({
          message: (err as { data?: { message: string } })?.data?.message,
          open: true,
          variant: 'alert',
          alert: {
            color: 'error'
          }
        })
      );
    }
  };

  return (
    <LoadingButton ref={ref} {...others} loading={isLoading} onClick={download}>
      {children}
    </LoadingButton>
  );
});

DownloadFileButton.displayName = 'DownloadFileButton';

export default DownloadFileButton;
