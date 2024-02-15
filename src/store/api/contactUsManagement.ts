import { ContactUs } from "types/contactUsManagment";
import { ResDetail, Res, Query } from "types/root";
import { enhancedApi } from "./index";


export const contractManagement = enhancedApi.injectEndpoints({
  endpoints: (builder) => ({
    contacts: builder.query<Res<ContactUs[]>, Query>({
      query({ page, perPage }) {
        return {
          method: "GET",
          url: "/admin/v1/contact-us?sortType=desc",
          params: {
            page,
            perPage,
          },
        };
      },
    }),
    contact: builder.query<ResDetail<ContactUs>, string | undefined>({
      query(id) {
        return {
          method: "GET",
          url: `/admin/v1/contact-us/${id}`,
        };
      },
    }),
    updateContact: builder.mutation<ResDetail<ContactUs>, any>({
      query({ id, reviewMessage }) {
        return {
          method: "PATCH",
          url: `/admin/v1/contact-us/${id}`,
          data: { reviewMessage }
        };
      },
    }),
    deleteContact: builder.mutation<ResDetail<ContactUs>, any>({
      query({ id }) {
        return {
          method: "DELETE",
          url: `/admin/v1/contact-us/${id}`,
        };
      },
    }),
  })
});


export const {
  useLazyContactsQuery,
  useContactQuery,
  useUpdateContactMutation,
  useDeleteContactMutation
} = contractManagement;
