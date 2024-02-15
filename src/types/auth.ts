import { ReactElement } from "react";
import { RealmRoleProps } from "./access";

// ==============================|| AUTH TYPES  ||============================== //

export interface ICaptcha {
  answer: string;
  hash: string;
}

export type GuardProps = {
  children: ReactElement | null;
};

export type AccessProps = {
  access?: Partial<RealmRoleProps>;
};

export type UserProfile = {
  id?: string;
  email?: string;
  avatar?: string;
  image?: string;
  name?: string;
  role?: string;
  tier?: string;
};

export interface AuthProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null;
  token?: string | null;
  realm_access?: RealmRoleProps;
}

export interface AuthActionProps {
  type: string;
  payload?: AuthProps;
}

export interface JWTDataProps {
  userId: string;
}

export type JWTContextType = {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null | undefined;
  logout: () => void;
  login: (data: LoginRequest) => Promise<LoginResponse>;
  getMe: () => Promise<void>;
};

export type Auth0ContextType = {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null | undefined;
  logout: () => void;
  login: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: VoidFunction;
};

export interface LoginRequest {
  NAt_ID: string;
  PaSS_worD: string;
}

export interface LoginResponse {
  data: {
    accessToken: string;
    message: string;
  };
  status: boolean;
}

export interface LockStateTypes {
  user: {
    username?: string;
    mobile?: string;
    nationalCode?: string;
    firstName?: string;
    lastName?: string;
  };
  token: string;
}

export type modeRequestType = "forgot-password" | "register" | "login";

export interface AuthStatesProps {
  mode: modeRequestType;
  user: {
    mobile?: string;
    username?: string;
    nationalCode?: string;
    firstName?: string;
    lastName?: string;
  };
  token?: string | undefined;
  successUrlPass: string;
}

export interface OTPRequest {
  mobile: string | undefined;
  username: string | undefined;
  otpCode: string;
}
export interface OTPResponse {
  data: {
    verifyToken: string;
  };
  message: string;
  statusCode: number;
}
export interface LoginOTPResponse {
  access_token: string;
  refresh_token: string;
}

export interface UserInfo {
  ail_verified: string;
  family_name: string;
  given_name: string;
  preferred_username: string;
  sub: string;
}

export interface ResendOTP {
  username?: string;
  mobile?: string;
  reason: string;
}

export interface RegisterMobileResponse {
  message: string;
  status: number;
}

export interface RegisterMobileRequest {
  mobile: string;
  captcha: {
    answer: string;
    hash: string;
  };
}

export interface IdentityRequest {
  nationalCode: string | undefined;
  mobile: string | undefined;
  verifyToken: string | undefined;
}

export interface InquiryRequest {
  nationalCode: string | undefined;
  birthDate: string | undefined;
  mobile: string | undefined;
  verifyToken: string | undefined;
}

export interface InquiryResponse {
  serial: string;
  socialIdentityExtensionSeries: string;
  certificateNumber: string;
  deathStatus: boolean;
  birthDate: string;
  gender: "MALE" | "FEMALE";
  fatherName: string;
  firstName: string;
  lastName: string;
  nationalCode: string;
  mobile: string;
}

export interface SetPasswordRequest {
  confirmPassword: string | undefined;
  mobile: string | undefined;
  password: string | undefined;
  username: string | undefined;
  verifyToken: string | undefined;
}

export interface SetPasswordResponse {
  message: string;
  statusCode: number;
}

export interface ForgotPasswordRequest {
  username: string;
  mobile: string;
  captcha: {
    answer: string;
    hash: string;
  };
}

export interface ForgotPasswordResponse {
  statusCode: number;
  message: string;
}

export interface ForgotUsernameRequest {
  mobile: string;
  captcha: {
    answer: string;
    hash: string;
  };
}

export interface IChangePasswordRequest {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

export interface IUserEvent {
  time?: number;
  type?: string;
  realmId?: string;
  clientId?: string;
  userId?: string;
  sessionId?: string;
  ipAddress?: string;
}
