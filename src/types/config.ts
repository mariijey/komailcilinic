export type ThemeDirection = "ltr" | "rtl";
export type ThemeMode = "light" | "dark";
export type FontFamily =
  | `'iransans-md',sans-serif`
  | `'Roboto', sans-serif`
  | `'Public Sans', sans-serif`;
export type PresetColor =
  | "default"
  | "theme1"
  | "theme2"
  | "theme3"
  | "theme4"
  | "theme5"
  | "theme6"
  | "theme7"
  | "theme8";
export type I18n = "fa" | "en"; // 'fa' - Persian,'en' - English

// ==============================|| CONFIG TYPES  ||============================== //

export type CustomizationActionProps = {
  type: string;
  payload?: CustomizationProps;
};

export type DefaultConfigProps = {
  defaultPath: string;
  fontFamily: FontFamily;
  i18n: I18n;
  miniDrawer: boolean;
  container: boolean;
  mode: ThemeMode;
  presetColor: PresetColor;
  themeDirection: ThemeDirection;
};

export type CustomizationProps = {
  defaultPath: string;
  fontFamily: FontFamily;
  i18n: I18n;
  miniDrawer: boolean;
  container: boolean;
  mode: ThemeMode;
  presetColor: PresetColor;
  themeDirection: ThemeDirection;
  onChangeContainer: VoidFunction;
  onChangeMode: (mode: ThemeMode) => void;
  onChangePresetColor: (theme: PresetColor) => void;
  onChangeDirection: (direction: ThemeDirection) => void;
  onChangeMiniDrawer: (miniDrawer: boolean) => void;
  onChangeFontFamily: (fontFamily: FontFamily) => void;
};

export enum UserTypeEnum {
  LANDLORD = "landlord",
  AGENT = "agent",
  TENANT = "tenant",
  INTERESTED = "interested",
  OTHER = "other",
}
export enum SortEnum {
  DESC = "desc",
  ASC = "asc",
}

export type Currency = "eur" | "gbp" | "usd";
