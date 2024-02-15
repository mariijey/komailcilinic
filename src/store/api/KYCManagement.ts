import { enhancedApi } from "./index";
import { KYC } from "types/KYCManagment";
import { ResDetail, Res } from "types/root";

export const KYCManagement = enhancedApi.injectEndpoints({
  endpoints: (builder) => ({
    KYCList: builder.query<Res<KYC[]>, any>({
      query(params) {
        return {
          method: "GET",
          url: "/admin/v1/kyc",
          params,
        };
      },
    }),
    KYC: builder.query<ResDetail<KYC>, string | undefined>({
      query(id) {
        return {
          method: "GET",
          url: `/admin/v1/kyc/${id}`,
        };
      },
    }),
    updateKyc: builder.mutation<any, any>({
      query({ id, ...updatedWithoutId }) {
        return {
          method: "PATCH",
          url: `/admin/v1/kyc/${id}`,
          data: updatedWithoutId,
        };
      },
    }),
  }),
});

export const { useLazyKYCListQuery, useKYCQuery, useUpdateKycMutation } =
  KYCManagement;
