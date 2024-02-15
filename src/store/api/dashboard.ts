import { enhancedApi } from './index';
import { ResDetail } from 'types/root'
import { dashboardData } from 'types/dashboard'

export const commonApi = enhancedApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<ResDetail<any>, void>({
      query() {
        return {
          method: 'GET',
          url: `/admin/v1/dashboard`
        };
      }
    }),
  })
});

export const { useGetDashboardQuery } = commonApi;
