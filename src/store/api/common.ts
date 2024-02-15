import { BaseDataResponse } from 'types/common';
import { enhancedApi } from './index';

export const commonApi = enhancedApi.injectEndpoints({
  endpoints: (builder) => ({

    baseData: builder.query<BaseDataResponse, void>({
      query(provinceId) {
        return {
          method: 'GET',
          url: `/admin/v1/basics/base-data`
        };
      }
    })
  })
});

export const { useBaseDataQuery } = commonApi;
