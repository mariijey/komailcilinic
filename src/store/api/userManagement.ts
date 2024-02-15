import {
  UserListParams,
  UserListResponse,
  UserItemSchema,
} from "types/userManagement";
import { enhancedApi } from "./index";

export const userManagement = enhancedApi.injectEndpoints({
  endpoints: (builder) => ({
    userList: builder.query<UserListResponse, UserListParams>({
      query({ page, perPage, searchKey, isAgent, sortType }) {
        return {
          method: "GET",
          url: "/admin/v1/users",
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
    getUser: builder.query<{ data: UserItemSchema }, string>({
      query(id) {
        return {
          method: "GET",
          url: `/admin/v1/users/${id}`,
        };
      },
      providesTags: ["userUpdate"],
    }),
    userUpdate: builder.mutation<any, any>({
      query({ id, data }) {
        return {
          method: "PATCH",
          url: `/admin/v1/users/${id}`,
          data,
        };
      },
      invalidatesTags: ["userUpdate"],
    }),
    saveSearches: builder.query<any, any>({
      query({ userId, params }) {
        return {
          method: "GET",
          url: `/admin/v1/users/${userId}/property-searches`,
          params,
        };
      },
    }),
    saveProperties: builder.query<any, any>({
      query({ userId, params }) {
        return {
          method: "GET",
          url: `/admin/v1/users/${userId}/favorites`,
          params,
        };
      },
    }),
    SendMail: builder.mutation<any, any>({
      query(values) {
        return {
          method: "POST",
          url: "/admin/v1/emails/send-mail",
          data: values,
        };
      },
    }),
    invoices: builder.query<any, any>({
      query(params) {
        return {
          method: "GET",
          url: `/admin/v1/payments/invoices`,
          params,
        };
      },
    }),
    sendPublicEmail: builder.mutation<any, any>({
      query(data) {
        return {
          method: "POST",
          url: "/admin/v1/newsletter-emails/management/send-public-mail",
          data: data,
        };
      },
    }),
    getRoles: builder.query<any, any>({
      query(params) {
        return {
          method: "GET",
          url: "/admin/v1/roles",
          params,
        };
      },
      providesTags: ["roleManagement"],
    }),
    getRole: builder.query<any, number | string>({
      query(id) {
        return {
          method: "GET",
          url: `/admin/v1/roles/${id}`,
        };
      },
    }),
    createRole: builder.mutation<any, any>({
      query(data) {
        return {
          method: "POST",
          url: "/admin/v1/roles",
          data,
        };
      },
      invalidatesTags: ["roleManagement"],
    }),
    updateRole: builder.mutation<any, any>({
      query({ id, data }) {
        return {
          method: "PATCH",
          url: `/admin/v1/roles/${id}`,
          data,
        };
      },
      invalidatesTags: ["roleManagement"],
    }),
    deleteRole: builder.mutation<any, number | string>({
      query(id) {
        return {
          method: "DELETE",
          url: `/admin/v1/roles/${id}`,
        };
      },
      invalidatesTags: ["roleManagement"],
    }),
    getAdmins: builder.query<any, any>({
      query(params) {
        return {
          method: "GET",
          url: "admin/v1/admins",
          params,
        };
      },
      providesTags: ["adminsManagement"],
    }),
    getAdmin: builder.query<any, number | string>({
      query(id) {
        return {
          method: "GET",
          url: `/admin/v1/admins/${id}`,
        };
      },
    }),
    createAdmin: builder.mutation<any, any>({
      query(data) {
        return {
          method: "POST",
          url: "/admin/v1/admins",
          data,
        };
      },
      invalidatesTags: ["adminsManagement"],
    }),
    updateAdmin: builder.mutation<any, any>({
      query({ id, data }) {
        return {
          method: "PATCH",
          url: `/admin/v1/admins/${id}`,
          data,
        };
      },
      invalidatesTags: ["adminsManagement"],
    }),
    deleteAdmin: builder.mutation<any, number | string>({
      query(id) {
        return {
          method: "DELETE",
          url: `/admin/v1/admins/${id}`,
        };
      },
      invalidatesTags: ["adminsManagement"],
    }),
    emailSettings: builder.mutation<any, any>({
      query({ id, data }) {
        return {
          method: "PATCH",
          url: `/admin/v1/users/${id}/email-settings`,
          data: data,
        };
      },
      invalidatesTags: ["userUpdate"],
    }),
    getPermissions: builder.query<any, any>({
      query() {
        return {
          url: `/admin/v1/permissions`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useLazyUserListQuery,
  useUserUpdateMutation,
  useGetUserQuery,
  useLazySaveSearchesQuery,
  useLazySavePropertiesQuery,
  useSendMailMutation,
  useLazyInvoicesQuery,
  useInvoicesQuery,
  useSendPublicEmailMutation,
  useLazyGetRolesQuery,
  useGetRolesQuery,
  useLazyGetRoleQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useLazyGetAdminsQuery,
  useLazyGetAdminQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
  useEmailSettingsMutation,
  useLazyGetPermissionsQuery,
} = userManagement;
