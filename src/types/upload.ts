export interface UploadResponse {
  status: boolean;
  data: {
    id: string;
    type: string;
    downloadUrl: string;
    thumbnails: any;
  };
  message: string;
}
