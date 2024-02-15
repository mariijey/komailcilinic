import { generateMapper } from './mapper';

export const INITIAL_TOKEN_MODEL = {
  access_token: '',
  refresh_token: ''
};

export const tokenMapper = generateMapper(INITIAL_TOKEN_MODEL);

export const TokenMapper = (data, many) => tokenMapper(data, many);
