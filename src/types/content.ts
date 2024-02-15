export interface bannerSchema {
  id: string;
  type: string;
  downloadUrl: string;
  thumbnails: any;
}
export interface NewCategoryResponse {
  status: boolean;
  message: string;
  data: CategorySchema;
}
export interface CategorySchema {
  id?: string;
  type: "news" | "faq";
  title: string;
  parentId?: number | string;
  shortDescription?: string;
  description?: string;
  bannerId?: string;
  banner?: bannerSchema;
}
export interface GetCategoryResponse {
  status: boolean;
  data: CategorySchema;
  message: string;
}

export interface CategoryListResponse {
  status: boolean;
  data: {
    items: CategorySchema[];
    pagination: {
      currentPage: number;
      lastPage: number;
      perPage: number;
      total: number;
    };
    meta: any;
  };
  message: string;
}
export interface CategoryListRequest {
  page?: number;
  perPage?: number;
  searchKey?: string;
  type?: "news" | "faq";
  sortType?: "desc" | "asc";
}

export interface PostResponse {
  status: boolean;
  data: {
    id: number;
    title: string;
    shortDescription: string;
    description: string;
    article: string;
    createdBy: number;
    category: CategorySchema;
    tags: string[];
    viewsCount: number;
    createdAt: string;
    updatedAt: string;
    banner?: bannerSchema;
  };
  message: string;
}
