import { errorType } from './constants';

const getErrorCode = (errorName: string) => {
  return errorType[errorName];
};

export default getErrorCode;
