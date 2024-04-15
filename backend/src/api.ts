import express from 'express';
import IndexController from './controllers/index.controller';
import helmet from 'helmet';

import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import { swaggerOptions } from './docs/swagger/swagger.config';
import { helmetConfig } from './docs/helmet.config';

const swaggerSpec = swaggerJSDoc(swaggerOptions);
const api = express();
api.use(helmet(helmetConfig));
api.use(express.json());
api.use('/api', IndexController);
api.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default api;
