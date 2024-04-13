import express from 'express';
import databaseManager from './db/database-manager'; // Ajuste o caminho conforme necessário
import environment from './util/environment';
import config from './config/config';
import IndexController from './controllers/index.controller';

import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
// import { swaggerOptions } from './docs/swagger/swagger.config';

environment.init();

// const swaggerSpec = swaggerJSDoc(swaggerOptions);
const app = express();

const PORT: number = config.server.port;

app.use(express.json());
app.use('/api', IndexController);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

(async () => {
  await databaseManager.initializeDatabase();

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
})();