import databaseManager from "./db/database-manager";
import config from './config/config';
import environment from './util/environment';
environment.init();
import api from './api';

const PORT: number = config.server.port;

(async () => {
    await databaseManager.initializeDatabase();
  
    api.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
})();