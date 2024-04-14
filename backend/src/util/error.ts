interface LoginResponse {
  nome: string;
  token: string;
}

const ErrorMessages = {
  authentication: {
    userNotFound: 'User not found',
    inactiveUser: 'Inactive user',
    invalidPassword: 'Invalid password',
    invalidCredentials: 'Invalid credentials',
    authenticationError: 'Authentication error',
  },
  database: {
    connectionError: 'Error connecting to the database',
    queryError: 'Error executing query',
    duplicateEntry: 'Duplicate entry',
    databaseError: 'Database error',
  },
  notFound: {
    resourceNotFound: 'Resource not found',
  },
  validation: {
    validationError: 'Validation error',
  },
};

const ThrowError = {
  throwDatabaseError: (message: string = ErrorMessages.database.databaseError) => {
    const error = new Error(message);
    (error as any).statusCode = 500;
    throw error;
  },
  
  throwNotFoundError: (message: string = ErrorMessages.notFound.resourceNotFound) => {
    const error = new Error(message);
    (error as any).statusCode = 404;
    throw error;
  },
  
  throwValidationError: (message: string = ErrorMessages.validation.validationError) => {
    const error = new Error(message);
    (error as any).statusCode = 400;
    throw error;
  },
  
  throwAuthenticationError: (message: string = ErrorMessages.authentication.authenticationError) => {
    const error = new Error(message);
    (error as any).statusCode = 401;
    throw error;
  },
};

export default {
  ErrorMessages,
  ThrowError
};

export { ErrorMessages, ThrowError };
