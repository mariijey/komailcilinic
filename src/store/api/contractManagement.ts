import {
  Contract,
  ContractText,
  AnalyzeRequestText,
  BankAccountInfo,
} from "types/contractManagment";
import { ResDetail, Res } from "types/root";
import { enhancedApi } from "./index";

export const contractManagement = enhancedApi.injectEndpoints({
  endpoints: (builder) => ({
    contractList: builder.query<any, any>({
      query(params) {
        return {
          method: "GET",
          url: "/admin/v1/contracts",
          params,
        };
      },
    }),
    contract: builder.query<ResDetail<Contract>, string | undefined>({
      query(id) {
        return {
          method: "GET",
          url: `/admin/v1/contracts/${id}`,
        };
      },
    }),
    completeContract: builder.mutation<ResDetail<Contract>, string | undefined>(
      {
        query(id) {
          return {
            method: "POST",
            url: `/admin/v1/contracts/${id}/complete`,
          };
        },
      }
    ),
    payments: builder.query<any, any>({
      query({ page, perPage, searchKey, isAgent, sortType, id }) {
        return {
          method: "GET",
          url: `/admin/v1/contracts/${id}/payments`,
          params: {
            page,
            perPage,
            searchKey,
            isAgent,
            sortType,
          },
        };
      },
    }),
    text: builder.query<ResDetail<ContractText>, any>({
      query(id) {
        return {
          method: "GET",
          url: `/admin/v1/contracts/${id}/text`,
        };
      },
    }),
    analyzes: builder.query<Res<AnalyzeRequestText[]>, any>({
      query({ page, perPage, sortType }) {
        return {
          method: "GET",
          url: `/admin/v1/contracts/analyze-requests?sortType=desc`,
          params: {
            page,
            perPage,
            sortType,
          },
        };
      },
    }),
    analyze: builder.query<ResDetail<AnalyzeRequestText>, string | undefined>({
      query(id) {
        return {
          method: "GET",
          url: `/admin/v1/contracts/analyze-requests/${id}`,
        };
      },
    }),
    uploadCsvAnalyze: builder.mutation<AnalyzeRequestText, any>({
      query({ id, data }) {
        return {
          method: "POST",
          url: `/admin/v1/contracts/analyze-requests/${id}/upload-csv-result`,
          data,
        };
      },
    }),
    updateStatusOfContract: builder.mutation<ResDetail<Contract>, any>({
      query({ id, status }) {
        return {
          method: "PATCH",
          url: `/admin/v1/contracts/${id}`,
          data: { status },
        };
      },
    }),
    downloadText: builder.mutation<any, any>({
      query(id) {
        return {
          method: "POST",
          url: `/admin/v1/contracts/${id}/text/download`,
          responseType: "blob",
          data: null,
        };
      },
    }),
    downloadAnalyzeText: builder.mutation<any, any>({
      query(id) {
        return {
          method: "POST",
          url: `/admin/v1/contracts/analyze-requests/${id}/highlighted-text/download`,
          responseType: "blob",
          data: null,
        };
      },
    }),
    setBankAccount: builder.mutation<
      any,
      { data?: BankAccountInfo; url: string }
    >({
      query({ data, url }) {
        return {
          method: "POST",
          url: `/admin/v1/contracts/${url}`,
          data,
        };
      },
    }),
    rejectDepositCertificate: builder.mutation<ResDetail<Contract>, any>({
      query({ id, data }) {
        return {
          method: "POST",
          url: `/admin/v1/contracts/${id}/reject-deposit-certificate`,
          data,
        };
      },
    }),
  }),
});

export const {
  useLazyContractListQuery,
  useContractQuery,
  useLazyPaymentsQuery,
  useTextQuery,
  useLazyAnalyzesQuery,
  useAnalyzeQuery,
  useUploadCsvAnalyzeMutation,
  useUpdateStatusOfContractMutation,
  useDownloadTextMutation,
  useDownloadAnalyzeTextMutation,
  useSetBankAccountMutation,
  useRejectDepositCertificateMutation,
  useCompleteContractMutation
} = contractManagement;
