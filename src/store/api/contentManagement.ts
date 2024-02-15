import {
  CategoryListRequest,
  CategoryListResponse,
  CategorySchema,
  GetCategoryResponse,
  NewCategoryResponse,
  PostResponse,
} from "types/content";
import { enhancedApi } from "./index";

export const contentManagement = enhancedApi.injectEndpoints({
  endpoints: (builder) => ({
    //category
    newCategory: builder.mutation<NewCategoryResponse, CategorySchema>({
      query(data) {
        return {
          method: "POST",
          url: `/admin/v1/categories`,
          data,
        };
      },
    }),
    getCategories: builder.query<
      CategoryListResponse,
      CategoryListRequest | void
    >({
      query(params) {
        return {
          method: "GET",
          url: `/admin/v1/categories`,
          params,
        };
      },
      providesTags: ["contentManagement_category"],
    }),
    getCategory: builder.query<GetCategoryResponse, string>({
      query(id) {
        return {
          method: "GET",
          url: `/admin/v1/categories/${id}`,
        };
      },
    }),
    updateCategory: builder.mutation<any, any>({
      query({ id, values }) {
        return {
          method: "PATCH",
          url: `/admin/v1/categories/${id}`,
          data: values,
        };
      },
    }),
    deleteCategory: builder.mutation<any, any>({
      query(id) {
        return {
          method: "DELETE",
          url: `/admin/v1/categories/${id}`,
        };
      },
      invalidatesTags: ["contentManagement_category"],
    }),
    // post
    getPosts: builder.query<any, any>({
      query(params) {
        return {
          method: "GET",
          url: `/admin/v1/posts`,
          params,
        };
      },
      providesTags: ["contentManagement_post"],
    }),
    getPost: builder.query<PostResponse, string>({
      query(id) {
        return {
          method: "GET",
          url: `/admin/v1/posts/${id}`,
        };
      },
    }),
    newPost: builder.mutation<any, any>({
      query(data) {
        return {
          method: "POST",
          url: `/admin/v1/posts`,
          data,
        };
      },
      invalidatesTags: ["contentManagement_post"],
    }),
    updatePost: builder.mutation<any, any>({
      query({ id, values }) {
        return {
          method: "PATCH",
          url: `/admin/v1/posts/${id}`,
          data: values,
        };
      },
      invalidatesTags: ["contentManagement_post"],
    }),
    deletePost: builder.mutation<any, any>({
      query(id) {
        return {
          method: "DELETE",
          url: `/admin/v1/posts/${id}`,
        };
      },
      invalidatesTags: ["contentManagement_post"],
    }),
  }),
});

export const {
  useNewCategoryMutation,
  useLazyGetCategoriesQuery,
  useGetCategoriesQuery,
  useLazyGetCategoryQuery,
  useLazyGetPostsQuery,
  useNewPostMutation,
  useLazyGetPostQuery,
  useDeletePostMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useUpdatePostMutation,
} = contentManagement;
