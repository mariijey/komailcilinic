import { Box, Button, Typography } from '@mui/material';
import React, { useImperativeHandle, useState } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import { isEmpty } from 'utils/helpers/main';
import ErrorHandler from '../ErrorHandler';

type Props = {
  subTitle?: string;
  setClose?: any;
  title?: string;
  onConfirm?: any;
  titleColor?: string;
};

type RefTypes = {
  setLoading?: (value: boolean) => void;
  setError?: (value: any) => void;
};

const ConfirmModal: React.ForwardRefRenderFunction<RefTypes, Props> = (props, forwardedRef) => {
  const { subTitle, setClose, title, onConfirm, titleColor = 'success' } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>({});

  useImperativeHandle(forwardedRef, () => ({
    setLoading: (value: boolean) => {
      setLoading(value);
    },
    setError: (value: any) => {
      setError(value);
    }
  }));

  return (
    <Box
      sx={{
        minWidth: "416px",
        p: 3,
      }}
    >
      <Box
        sx={{
          width: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {title && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alinItems: "center",
              "& .anticon": {
                color: `${titleColor}.main`,
              },
            }}
          >
            <CheckCircleOutlined style={{ fontSize: "1.3rem" }} />
            <Typography
              variant={"body1"}
              component={"p"}
              ml={1}
              fontWeight={"bold"}
              sx={{ color: `${titleColor}.main` }}
            >
              {title}
            </Typography>
          </Box>
        )}
        {subTitle && (
          <Typography
            variant={"body1"}
            component={"p"}
            sx={{
              paddingTop: 1,
              paddingBottom: 1,
            }}
          >
            {subTitle}
          </Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
        {!isEmpty(error) && <ErrorHandler error={error} />}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 3 }}>
        {setClose && (
          <Button
            disableElevation
            disabled={loading}
            type="button"
            variant="text"
            color="error"
            sx={{
              height: "42px",
              minWidth: "100px",
            }}
            onClick={setClose}
          >
            Cancel
          </Button>
        )}

        {onConfirm && (
          <Button
            disableElevation
            disabled={loading}
            type="button"
            variant="contained"
            color="primary"
            sx={{
              height: "42px",
              minWidth: "100px",
            }}
            onClick={onConfirm}
          >
            Confirm
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default React.forwardRef(ConfirmModal);
