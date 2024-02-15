import { SortEnum, UserTypeEnum } from "types/config";

export type ImageSchema = {
  id: string;
  type: string;
  downloadUrl: string;
  thumbnails: any;
};
type AddressSchema = {
  address: string;
  phone: string;
  postcode: string;
};

type SocialSchema = {
  twitter: string;
  youtube: string;
  facebook: string;
  instagram: string;
};

type AgentSchema = {
  logo?: any;
  id?: number;
  name: string;
  email: string;
  number: string;
  phone: string;
  mobile: string;
  about: string;
  openingHours: any;
  logoId?: ImageSchema | null;
  createdAt?: string;
  updatedAt?: string;
};
type paginationSchema = {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
};

export interface UserListParams {
  page?: number;
  perPage?: number;
  searchKey?: string;
  isAgent?: string;
  sortType?: SortEnum;
}

export interface UserItemSchema {
  id: number;
  username: string;
  email: string;
  mobile: string;
  name: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
  social: {
    twitter: string;
    youtube: string;
    facebook: string;
    instagram: string;
  };
  emailSettings: {
    newProperties: boolean;
    newRequests: boolean;
    news: boolean;
  };
  website: string;
  emailVerifiedAt: string;
  referralCode: string;
  userType: UserTypeEnum;
  avatar: ImageSchema | null;
  address: AddressSchema;
  agent: AgentSchema;
  activePlans: [];
}

export interface UserListResponse {
  status: boolean;
  message: string;
  data: {
    items: UserItemSchema[];
    pagination: paginationSchema;
    meta: any;
  };
}

export interface userUpdateRequest {
  id: number | string;
  email: string;
  password: string;
  name: string;
  mobile: string;
  website: string;
  bio: string;
  avatarId: string;
  userType: UserTypeEnum;
  social: SocialSchema;
  address: AddressSchema;
  agent: {
    name: string;
    email: string;
    number: string;
    phone: string;
    mobile: string;
    about: string;
    openingHours: {
      monday: {
        open: string;
        close: string;
      };
      tuesday: {
        open: string;
        close: string;
      };
      wednesday: {
        open: string;
        close: string;
      };
      thursday: {
        open: string;
        close: string;
      };
      friday: {
        open: string;
        close: string;
      };
      saturday: {
        open: string;
        close: string;
      };
      sunday: {
        open: string;
        close: string;
      };
    };
    logoId: string;
  };
}

export interface Permissions {
  id: number;
  name: string;
  codename: string;
}
