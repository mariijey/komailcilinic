import axios, { AxiosRequestConfig } from "axios";
import { BaseQueryFn, createApi } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "config";
import { openSnackbar } from "store/reducers/snackbar";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ErrorType, errorNormalizer } from "components/ErrorHandler";

type methodType = "get" | "post" | "put" | "patch" | "delete";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  validateStatus: function (status: any) {
    return status >= 200 && status < 300;
  },
});

const axiosBaseQuery =
  (): BaseQueryFn<
    AxiosRequestConfig,
    unknown,
    SerializedError | FetchBaseQueryError
  > =>
  async (args: AxiosRequestConfig, api: any, extraOptions: any) => {
    try {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
        "token"
      )}`;
      const res = await axiosInstance(args);
      const data = res?.data;
      const method = res?.config.method as methodType;
      const status = res?.status;

      if (method !== "get" && status >= 200 && status < 300)
        api.dispatch(
          openSnackbar({
            open: true,
            message: data.message,
            variant: "alert",
            alert: {
              color: method === "delete" ? "warning" : "success",
            },
          })
        );
      setTimeout(() => {
        api.dispatch(
          openSnackbar({
            open: false,
          })
        );
      }, 3000);

      return { data };
    } catch (error: any) {
      const response = error.response;
      const status = response.status;
      const isLoginReq = response.config.url.includes("sign-in");

      if (status === 500 || status > 500) {
        api.dispatch(
          openSnackbar({
            open: true,
            message: "ServerError",
            variant: "alert",
            alert: {
              color: "error",
            },
          })
        );
      }
      // else if (!isLoginReq && status === 401) {
      //   delete axiosInstance.defaults.headers.common.Authorization;
      //   localStorage.removeItem("token");
      //   localStorage.removeItem("isLoggedIn");
      //   window.location.replace("/login");
      //   return axiosBaseQuery()(args, api, extraOptions);
      // }
      else {
        api.dispatch(
          openSnackbar({
            open: true,
            message: errorNormalizer(response as ErrorType),
            variant: "alert",
            alert: {
              color: "error",
            },
          })
        );
      }

      setTimeout(() => {
        api.dispatch(
          openSnackbar({
            open: false,
          })
        );
      }, 3000);

      return {
        error: {
          status: error.response?.status,
          data: error.response?.data || error.message,
        },
      };
    }
  };

export const api = createApi({
  baseQuery: axiosBaseQuery(),
  tagTypes: [
    "userUpdate",
    "propertyManagement",
    "reportsProperty",
    "contentManagement_post",
    "contentManagement_category",
    "contentManagement_category",
    "roleManagement",
    "adminsManagement",
  ],
  endpoints: () => ({}),
});

export const enhancedApi = api.enhanceEndpoints({});

export const { invalidateTags } = enhancedApi.util;
