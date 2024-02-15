// types
import { DefaultConfigProps } from "types/config";

export const drawerWidth = 260;
export const twitterColor = "#1DA1F2";
export const facebookColor = "#3b5998";
export const linkedInColor = "#0e76a8";
export const youtubeColor = "#FF0000";
export const instagramColor = "#833AB4";

export const BASE_URL = process.env.REACT_APP_API_URL;

export const IMG_PATH_NAME = "file/api/file/image/";
export const FILE_PATH_NAME = "file/api/file/";

export const JWT_API = {
  secret: "SECRET-KEY",
  timeout: "1 days",
};

export const AUTH0_API = {
  client_id: "7T4IlWis4DKHSbG8JAye4Ipk0rvXkH9V",
  domain: "dev-w0-vxep3.us.auth0.com",
};

// ==============================|| THEME CONFIG  ||============================== //

const config: DefaultConfigProps = {
  defaultPath: "/",
  fontFamily: "'iransans-md',sans-serif",
  i18n: "en",
  miniDrawer: false,
  container: false,
  mode: "light",
  presetColor: "default",
  themeDirection: "ltr",
};

export const RTL_LANGS = ["fa"];

export const REF_TOKEN_OBJ_NAME = "apollo-ref-token";
export const JWT_DECODE_KEY = "JWT_DECODE_KEY";

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 30;

export const EMAIL_MAX_LENGTH = 256; // can be 320

export const IMG_AVATAR_SIZE = 2097152; // 2MB
export const IMG_AVATAR_TYPES = [".jpeg", ".jpg", ".png"];

export const COMMON_FILE_SIZE = 2097152; // 2MB
export const COMMON_FILE_TYPES = [
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".jpg",
  ".jpeg",
  ".png",
];


export default config;

