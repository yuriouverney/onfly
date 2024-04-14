import environment from '../util/environment';
import config from '../config/config';
import databaseManager from './database-manager';
import { Sequelize } from 'sequelize-typescript';
environment.init();

async function initialize() {
    const dbName = config.database?.db;
    const sequelize = new Sequelize({
        dialect: 'mysql',
        host: config.database?.host,
        port: parseInt(config.database?.port || '3306'),
        username: config.database?.username,
        password: config.database?.password,
        logging: false,
    });
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${config.database?.db};`);
    await databaseManager.initializeDatabase();
}

initialize();