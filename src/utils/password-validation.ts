import { isEmpty } from 'utils/helpers/main';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '../config';

function isNumber(value: string): boolean {
  if (!isEmpty(value)) {
    return new RegExp('^(?=.*[0-9]).+$').test(value);
  }
  return false;
}

function isLowercaseChar(value: string): boolean {
  if (!isEmpty(value)) {
    return new RegExp('^(?=.*[a-z]).+$').test(value);
  }
  return false;
}

function isUppercaseChar(value: string): boolean {
  if (!isEmpty(value)) {
    return new RegExp('^(?=.*[A-Z]).+$').test(value);
  }
  return false;
}

function isSpecialChar(value: string): boolean {
  // return new RegExp('^(?=.*[-+_!@#$%^&*.,?]).+$').test(value);
  if (!isEmpty(value)) {
    return new RegExp('^(?=.*[!@#$%^&]).+$').test(value);
  }
  return false;
}

function minLength(value: string, min = PASSWORD_MIN_LENGTH - 1): boolean {
  return !isEmpty(value) ? value.length > min : false;
}

function maxLength(value: string, max = PASSWORD_MAX_LENGTH + 1): boolean {
  return !isEmpty(value) ? value.length < max : false;
}

export { isNumber, isLowercaseChar, isUppercaseChar, isSpecialChar, minLength, maxLength };
