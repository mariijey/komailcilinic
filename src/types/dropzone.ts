// material-ui
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material';

//third-party
import { DropzoneOptions } from 'react-dropzone';

// ==============================|| TYPES - DROPZONE  ||============================== //

export interface CustomFile extends File {
  path?: string;
  preview?: string;
  lastModifiedDate?: Date;
}

export interface UploadProps extends DropzoneOptions {
  error?: boolean;
  maxSize?: number;
  file: CustomFile[] | null;
  setFieldValue: (field: string, value: any) => void;
  onRemoveHandler?: () => void;
  loading?: boolean;
  sx?: SxProps<Theme>;
}


export interface SIngleUploadProps extends DropzoneOptions {
  error?: boolean;
  maxSize?: number;
  file: CustomFile[] | null | string;
  setFieldValue: (field: string, value: any) => void;
  onRemoveHandler?: () => void;
  loading?: boolean;
  sx?: SxProps<Theme>;
}


export interface UploadMultiFileProps extends DropzoneOptions {
  files?: CustomFile[] | null;
  error?: boolean;
  showList?: boolean;
  sx?: SxProps<Theme>;
  onUpload?: VoidFunction;
  onRemove?: (file: File | string) => void;
  onRemoveAll?: VoidFunction;
  setFieldValue: (field: string, value: any) => void;
}

export interface FilePreviewProps {
  showList?: boolean;
  files: (File | string)[];
  onRemove?: (file: File | string) => void;
}
