import { enhancedApi } from "./index";

export const propertyManagement = enhancedApi.injectEndpoints({
  endpoints: (builder) => ({
    propertyList: builder.query<any, any>({
      query(params) {
        return {
          method: "GET",
          url: "/admin/v1/properties",
          params,
        };
      },
      providesTags: ["propertyManagement"],
    }),
    property: builder.query<any, string | number>({
      query(id) {
        return {
          method: "GET",
          url: `/admin/v1/properties/${id}`,
        };
      },
      providesTags: ["propertyManagement"],
    }),
    updateStatus: builder.mutation<any, any>({
      query({ id, status }) {
        return {
          method: "PATCH",
          url: `/admin/v1/properties/${id}`,
          data: { status },
        };
      },
      invalidatesTags: ["propertyManagement"],
    }),
    propertyReports: builder.query<any, any>({
      query({ propertyId, params }) {
        return {
          method: "GET",
          url: `/admin/v1/properties/${propertyId}/reports`,
          params,
        };
      },
      providesTags: ["reportsProperty"],
    }),
    approveReport: builder.mutation<any, any>({
      query({ id }) {
        return {
          method: "POST",
          url: `/admin/v1/reports/approve/${id}`,
        };
      },
      invalidatesTags: ["reportsProperty"],
    }),
    allPropertyReports: builder.query<any, any>({
      query(params) {
        return {
          method: "GET",
          url: "/admin/v1/reports/properties",
          params,
        };
      },
      providesTags: ["reportsProperty"],
    }),
    requests: builder.query<any, any>({
      query(params) {
        return {
          method: "GET",
          url: `/admin/v1/property-requests`,
          params,
        };
      },
    }),
  }),
});

export const {
  usePropertyListQuery,
  useLazyPropertyListQuery,
  usePropertyQuery,
  useUpdateStatusMutation,
  useLazyPropertyReportsQuery,
  useApproveReportMutation,
  useLazyAllPropertyReportsQuery,
  useLazyRequestsQuery,
} = propertyManagement;
