import { Sequelize } from 'sequelize-typescript';
import * as fs from 'fs';
import * as path from 'path';
import environment from '../util/environment';
environment.init();
import config from '../config/config';
import logger from '../util/logger';

class DatabaseManager {
  private db: any;

    constructor() {
        this.db = new Map();
    }

    async initializeDatabase(directory = '../models') {
        logger.info('Starting database...');
        const dbName = config.database?.db;
        const sequelize = new Sequelize({
            dialect: 'mysql',
            host: config.database?.host,
            port: parseInt(config.database?.port || '3306'),
            username: config.database?.username,
            password: config.database?.password,
            database: config.database?.db,
            logging: false,
        });

        const modelsDir = path.join(__dirname, directory);
        const modelFiles = (await fs.promises.readdir(modelsDir)).filter(file => file.endsWith('.ts'));

        const models = modelFiles.map(file => require(path.join(modelsDir, file)).default);
        sequelize.addModels(models);

        models.forEach(model => {
            if (model.associate) {
                model.associate(sequelize.models);
            }
        });

        await sequelize.sync({ force: false });
        this.db.set(dbName, sequelize);
        logger.info('Database initialized successfully.');
    }

    getDatabaseGeral() {
        const dbName = config.database?.db;
        if (!this.db.has(dbName)) {
            throw new Error(`Database for ${dbName} not initialized`);
        }
        return this.db.get(dbName);
    }
}

export default new DatabaseManager();
