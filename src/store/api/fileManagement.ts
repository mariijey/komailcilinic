import { UploadResponse } from "types/upload";
import { enhancedApi } from ".";

export const fileManagement = enhancedApi.injectEndpoints({
  endpoints: (builder) => ({
    downloadFile: builder.query<any, string>({
      query(fileId) {
        return {
          method: "GET",
          url: `/admin/v1/files/download/${fileId}`,
          responseType: "blob",
        };
      },
    }),
    uploadFile: builder.mutation<UploadResponse, FormData>({
      query(data) {
        return {
          method: "POST",
          url: `/admin/v1/files/upload`,
          data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
    }),
  }),
});
export const { useLazyDownloadFileQuery, useUploadFileMutation } =
  fileManagement;
