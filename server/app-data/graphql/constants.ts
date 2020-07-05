export const errorName = {
  INVALID_DATA: 'INVALID_DATA',
  NOT_FOUND: 'NOT_FOUND',
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  SERVER_ERROR: 'SERVER_ERROR',
};

export const errorType = {
  INVALID_DATA: {
    message: 'Invalid data',
    code: 422,
  },
  NOT_FOUND: {
    message: 'Not found',
    statusCode: 404,
  },
  USER_ALREADY_EXISTS: {
    message: 'User is already exists.',
    statusCode: 403,
  },
  SERVER_ERROR: {
    message: 'Server error.',
    statusCode: 500,
  },
};
