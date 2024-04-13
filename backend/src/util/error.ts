interface LoginResponse {
  nome: string;
  token: string;
}

const ErrorMessages = {
  authentication: {
    userNotFound: 'Usuário não encontrado',
    inactiveUser: 'Usuário inativo',
    invalidPassword: 'Senha inválida',
    invalidCredentials: 'Credenciais inválidas',
    authenticationError: 'Erro de Autenticação',
    subscriptionExpired:'Assinatura expirada, favor atualizar seu plano'
  },
  database: {
    connectionError: 'Erro ao conectar ao banco de dados',
    queryError: 'Erro na execução da consulta',
    duplicateEntry: 'Entrada duplicada',
    databaseError: 'Erro de Banco de Dados',
  },
  notFound: {
    resourceNotFound: 'Recurso não encontrado',
  },
  validation: {
    validationError: 'Erro de Validação',
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
