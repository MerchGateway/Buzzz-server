import configuration from '../config/configuration';
import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { config as envConfig } from 'dotenv';

envConfig();

const config = configuration();
export const AppDataSource: DataSource = new DataSource({
  type: config.database.connection as MysqlConnectionOptions['type'],
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  synchronize: true,
  database: config.database.name,
  migrations: [config.database.migrations],
  entities: [config.database.entities],
  
});
