import { enhancedApi } from "./index";

export const emailsManagement = enhancedApi.injectEndpoints({
  endpoints: (builder) => ({
    subscribedList: builder.query<any, any>({
      query(params) {
        return {
          method: "GET",
          url: `/admin/v1/newsletter-emails`,
          params,
        };
      },
    }),
    exportCSV: builder.query<any, void>({
      query() {
        return {
          method: "GET",
          url: `/admin/v1/newsletter-emails/management/export-csv`,
        };
      },
    }),
  }),
});
export const { useLazySubscribedListQuery, useExportCSVQuery } =
  emailsManagement;
