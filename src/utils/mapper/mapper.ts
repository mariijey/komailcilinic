import { isArray } from 'lodash';
import { isEmpty } from '../helpers/main';

const get = (data: never, field: string, base: { [x: string]: any }) => {
  return !isEmpty(data[field]) ? data[field] : base[field];
};

export const objectMapper = (data: never, base: {}, custom_fields: { [p: string]: unknown } | ArrayLike<unknown> | undefined) => {
  let result = {};
  Object.keys(base).forEach((field) => {
    // @ts-ignore
    result[field] = get(data, field, base);
  });
  custom_fields &&
    Object.entries(custom_fields).forEach(([key, miniMapper]) => {
      // @ts-ignore
      result[key] = miniMapper(data[key]);
    });
  return result;
};

export const generateMapper = (base: any, custom_fields?: { [s: string]: unknown } | ArrayLike<unknown>) => (data: any[], many: any) => {
  if (many) {
    if (!isArray(data)) {
      return [];
    }
    if (isEmpty(data)) {
      return [];
    }
    // @ts-ignore
    return data.map((item) => objectMapper(item, base, custom_fields));
  }

  if (isEmpty(data) || isArray(data)) {
    const emptyResults = { ...base };
    custom_fields &&
      Object.entries(custom_fields).forEach(([key, miniMapper]) => {
        // @ts-ignore
        emptyResults[key] = miniMapper(null);
      });
    return emptyResults;
  }

  return objectMapper(data, base, custom_fields);
};
