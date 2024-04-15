export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Example API',
      version: '1.0.0',
      description: 'Example API with Swagger Documentation',
    },
    components: {
      securitySchemes: {
        authorization: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT authentication for agencies',
        },
      },
    },
    security: [
      {
        authorization: 'array',
      },
    ],
    tags: [
      {
        name: 'Authentication',
        description: 'Authentication operations',
      },
      {
        name: 'Expenses',
        description: 'Operations related to expenses',
      },
    ],
  },
  apis: ['src/controllers/*.ts'],
};
