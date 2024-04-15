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
        authorization: [],
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
  // Verify and adjust the paths in the `apis` array
  apis: ['src/controllers/*.ts'],
};
