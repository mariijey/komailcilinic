import { useEffect, useState } from 'react';
import { Alert, Stack, Typography } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

type Props = {
  error?: SerializedError | FetchBaseQueryError;
  onclose?: () => void;
};

export type ErrorType =
  | SerializedError
  | { status: number; data: unknown }
  | { status: "FETCH_ERROR"; data?: undefined; error: string }
  | {
      status: "PARSING_ERROR";
      originalStatus: number;
      data: string;
      error: string;
    }
  | { status: "CUSTOM_ERROR"; data?: unknown; error: string }
  | undefined;

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

export function isErrorWithMessage(error: unknown): error is { message: string } {
  return typeof error === 'object' && error != null && 'message' in error && typeof (error as any).message === 'string';
}

export const errorNormalizer = (error: ErrorType) => {
  if (isFetchBaseQueryError(error)) {
    switch (error?.status) {
      case 'FETCH_ERROR':
      case undefined: {
        return "Fetch Error";
      }
      case 'PARSING_ERROR': {
        return "ParsingError";
      }
      case 'CUSTOM_ERROR': {
        return "CustomError";
      }
      case 500: {
        return "ServerError";
      }
      case 501:
      case 502:
      case 503:
      case 504: {
        return "ServiceProviderError";
      }
      default: {
        return (error?.data as any)?.message;
      }
    }
  } else {
    if (isErrorWithMessage(error)) return error.message;
  }
  return '';
};

export const errorMessages = (errorMessage: any) => {
  if (typeof errorMessage === 'string') {
    return <Typography>{errorMessage}</Typography>;
  }
  if (typeof errorMessage === 'object') {
    for (let prop in errorMessage) {
      if (Object.prototype.hasOwnProperty.call(errorMessage, prop)) {
        return <Typography>{errorMessage[prop]}</Typography>;
      }
    }
  }

  return <Typography>FetchError</Typography>;
};

const ErrorHandler = (props: Props) => {
  const { error, onclose } = props;
  const [errorMessage, setErrorMessage] = useState<string | string[]>('');

  useEffect(() => {
    const err = errorNormalizer(error as ErrorType);
    setErrorMessage(err);
  }, [error]);

  return (
    <Stack sx={{ width: '100%' }} style={{ paddingTop: '10px' }} spacing={2} className="showAlert">
      <Alert
        variant="border"
        severity="error"
        onClose={onclose}
        sx={{ display: 'flex', alignItems: 'center' }}
        iconMapping={{
          error: <ErrorOutlineIcon sx={{ fontSize: '1.2rem' }} />
        }}
      >
        {errorMessages(errorMessage)}
      </Alert>
    </Stack>
  );
};

export default ErrorHandler;
