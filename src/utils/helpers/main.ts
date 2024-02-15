import lodashIsEmpty from "lodash/isEmpty";
import { JWT_DECODE_KEY, REF_TOKEN_OBJ_NAME, RTL_LANGS } from "config";
import CryptoJS from "crypto-js";
import { createBrowserHistory } from "history";
import { Currency } from "types/config";

export const history = createBrowserHistory();

export const msSleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const sleep = (second: number) => {
  return msSleep(second * 1000);
};

// export const setRefToken = (refreshToken: string) => {
//   const hashedTokenString = getEncryptedObject(refreshToken);
//   if (window && hashedTokenString != null) {
//     window.localStorage.setItem(REF_TOKEN_OBJ_NAME, hashedTokenString);
//   }
// };

export const getRefToken = () => {
  if (window) {
    const tokenObj = window.localStorage.getItem(REF_TOKEN_OBJ_NAME);
    if (tokenObj) {
      return getUnencryptedObject(tokenObj);
    }
  }
  return null;
};

export const isEmpty = (value: any) => {
  if (typeof value === "number") {
    try {
      const intValue = parseFloat(String(value));
      if (intValue === 0 || intValue === 0.0) return false;
    } catch {}
    return !Boolean(value);
  }

  return lodashIsEmpty(value);
};

export const getEncryptedObject = (data: string) => {
  try {
    return CryptoJS.DES.encrypt(data, JWT_DECODE_KEY).toString();
  } catch (e) {
    return null;
  }
};

export const getUnencryptedObject = (hashedObj: any) => {
  try {
    const bytes = CryptoJS.DES.decrypt(hashedObj, JWT_DECODE_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch {
    return null;
  }
};

export const toPersianNum = (content: string | number) => {
  let persianContent = "";
  if (content) {
    content = content.toString();
    for (let i = 0; i < content.length; i++) {
      switch (content.charAt(i)) {
        case "0":
          persianContent += "۰";
          break;
        case "1":
          persianContent += "۱";
          break;
        case "2":
          persianContent += "۲";
          break;
        case "3":
          persianContent += "۳";
          break;
        case "4":
          persianContent += "۴";
          break;
        case "5":
          persianContent += "۵";
          break;
        case "6":
          persianContent += "۶";
          break;
        case "7":
          persianContent += "۷";
          break;
        case "8":
          persianContent += "۸";
          break;
        case "9":
          persianContent += "۹";
          break;
        default:
          persianContent += content.charAt(i);
          break;
      }
    }
    return persianContent;
  } else {
    if (content === 0 || content === "0") {
      return persianContent + "۰";
    }
    return persianContent;
  }
};

export const toEnglishNum = (content: string | number) => {
  let englishContent = "";

  if (content) {
    content = content.toString();
    for (let i = 0; i < content.length; i++) {
      switch (content.charAt(i)) {
        case "۰":
          englishContent += "0";
          break;
        case "۱":
          englishContent += "1";
          break;
        case "۲":
          englishContent += "2";
          break;
        case "۳":
          englishContent += "3";
          break;
        case "۴":
          englishContent += "4";
          break;
        case "۵":
          englishContent += "5";
          break;
        case "۶":
          englishContent += "6";
          break;
        case "۷":
          englishContent += "7";
          break;
        case "۸":
          englishContent += "8";
          break;
        case "۹":
          englishContent += "9";
          break;
        default:
          englishContent += content.charAt(i);
          break;
      }
    }
    return englishContent;
  } else {
    if (content === 0 || content === "۰") {
      return englishContent + "0";
    }
    return englishContent;
  }
};

export const normalizeContent = (content: string | number, type: string) => {
  if (!content) {
    return "";
  }
  if (type === "in") {
    return toEnglishNum(content);
  } else {
    return toEnglishNum(content);
  }
};

export const getFileExtensionWithDot = (filename: any) => {
  if (filename) {
    let re = /(?:\.([^.]+))?$/;
    return re.exec(filename);
  }
};

export const validateFileType = (file: any, valid_types: any) => {
  if (file) {
    const validTypes = valid_types; // [ 0.".png", 1:".jpg" , ... ]
    // @ts-ignore
    const fileType = getFileExtensionWithDot(file.name)[0];
    if (validTypes?.length) {
      return validTypes.indexOf(fileType.toLowerCase()) !== -1;
    }
  }
  return false;
};

export const validateFileSize = (
  file: { size: number },
  valid_size: number
) => {
  let validate = false;
  if (file) {
    if (valid_size) {
      validate = file.size <= valid_size;
    }
  }
  return validate;
};

export const roundDown = (n: number, decimals = 0) => {
  const multiplier = 10 ** decimals;
  return Math.floor(n * multiplier) / multiplier;
};

export const isNumeric = (number: string | number) => {
  try {
    const regex = new RegExp("^[0-9]*$");
    return !isNaN(Number(number)) && regex.test(String(number));
  } catch (e) {
    return false;
  }
};

export const imageSizeNormalize = (value: number) => {
  if (!isNumeric(value)) {
    return value;
  }
  if (value > 1073741824) {
    return `${roundDown(value / 1073741824, 1)} GByte`;
  }
  if (value > 1048576) {
    return `${roundDown(value / 1048576, 1)} MByte`;
  }
  if (value > 1024) {
    return `${roundDown(value / 1024, 1)} KByte"`;
  }
  return `${value} Byte`;
};

export const formatsListNormalizer = (
  valueList: any[],
  separator: string,
  withDot = false
) => {
  let newValue = "";
  const valueListLength = valueList.length;
  let i = 1;
  valueList.forEach((value) => {
    if (!withDot) {
      value = value.replace(".", "");
    }
    if (i >= valueListLength) {
      newValue += value;
    } else {
      newValue += value + ` ${separator} `;
    }
    i += 1;
  });
  return newValue;
};

export const isValidHttpUrl = (url: string) => {
  let _url;
  try {
    _url = new URL(url);
  } catch (_) {
    return false;
  }
  return _url.protocol === "http:" || _url.protocol === "https:";
};

export const removeAllOccurrences = (
  string: string | number,
  find?: string
) => {
  if (!string) {
    return "";
  }
  if (!find) {
    return string.toString();
  }
  return string.toString().split(find).join("");
};

export const thousandSeparate = (number: number) => {
  if (number === 0) {
    return 0;
  } else {
    return removeAllOccurrences(number).replace(/\B(?=(\d{3})+(?!\d))/g, "٫");
  }
};

export const getInitials = (name: string): string => {
  let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");

  let initials = [...name.matchAll(rgx)] || [];

  return (initials.shift()?.[1] || "") + (initials.pop()?.[1] || "");
};

export type NSU = number | string | undefined;

export const getPrice = (x: NSU): NSU => {
  if (x) return "£" + Number(x).toLocaleString();
};
export const addCommas = (x: NSU): NSU => {
  if (x) return Number(x).toLocaleString();
};

export const getLocaleDateString = (value?: string) => {
  return value ? new Date(value).toLocaleDateString() : "-";
};

export const spiltEmail = (value?: string) => {
  return value?.split("@")[0];
};
export const spiltUnderLine = (value?: string) => {
  return value?.split("_").join(" ");
};

export const setAmountWithCurrency = (
  amount: string | number,
  currency: Currency
) => {
  let symbol;
  if (currency === "gbp") symbol = "£";
  else if (currency === "eur") symbol = "€";
  else symbol = "$";

  return Number(amount).toLocaleString() + symbol;
};

export const setCurrency = (currency: Currency) => {
  let symbol;
  if (currency === "gbp") symbol = "£";
  else if (currency === "eur") symbol = "€";
  else symbol = "$";
  return symbol;
};
