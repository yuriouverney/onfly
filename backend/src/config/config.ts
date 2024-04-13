interface ServerConfig {
    port: number;
  }
  
  interface DatabaseConfig {
    host: string;
    port: string;
    dialect: string;
    username: string;
    password: string;
    db: string;
    storagePath: string;
    options: {
      operatorsAliases: boolean;
    };
    dialectOptions: {
      dateStrings: boolean;
      typeCast: boolean;
    };
    timezone: string;
  }
  
  interface SecurityConfig {
    bcryptSaltRound?: number;
    jwtSignKey: string;
    jwtAccessTokenExpiresIn: string;
    jwtRefreshTokenExpiresIn: string;
  }
  
  interface LogConfig {
    logLevel: string;
    enableConsoleLog: string;
    enableCloudWatchLog: string;
  }
  
  interface AppConfig {
    server: ServerConfig;
    database: DatabaseConfig;
    security: SecurityConfig;
    log: LogConfig;
  }
  
  const config: AppConfig = {
    server: {
      port: +process.env.SERVER_PORT!,
    },
    log: {
      logLevel: process.env.LOG_LEVEL!,
      enableConsoleLog: process.env.ENABLE_CONSOLE_LOG!,
      enableCloudWatchLog: process.env.ENABLE_CLOUDWATCH_LOG!,
    },
    database: {
      host: process.env.DB_HOSTNAME!,
      port: process.env.DB_PORT!,
      dialect: process.env.DB_DIALECT!,
      username: process.env.DB_USERNAME!,
      password: process.env.DB_PASSWORD!,
      db: process.env.DB_NAME_GERAL!,
      storagePath: process.env.DB_STORAGE_PATH!,
      options: {
        operatorsAliases: false,
      },
      dialectOptions: {
        dateStrings: true,
        typeCast: true,
      },
      timezone: '-03:00',
    },
    security: {
      jwtSignKey: process.env.JWT_SIGN_KEY!,
      bcryptSaltRound: parseInt(process.env.BCRYPT_SALT_ROUND!),
      jwtAccessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN!,
      jwtRefreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN!,
    }
  
  };
  
  export default config;
  
