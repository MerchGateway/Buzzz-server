import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export interface DatabaseConfig {
  connection: MysqlConnectionOptions['type'];
  url: string;
  host: string;
  port: number;
  name: string;
  username: string;
  password: string;
  synchronize: boolean;
  entities: string;
  migrations: string;
  migrationsDir: string;
}

export default () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  database: {
    connection: process.env.TYPEORM_CONNECTION,
    url: process.env.TYPEORM_URL,
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT, 10) || 3306,
    name: process.env.TYPEORM_DATABASE,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    synchronize: process.env.TYPEORM_SYNCHRONIZE,
    entities: process.env.TYPEORM_ENTITIES,
    migrations: process.env.TYPEORM_MIGRATIONS,
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRE,
    cookieExpire: process.env.JWT_COOKIE_EXPIRE,
  },
  oauth: {
    googleClientId: process.env.OAUTH_GOOGLE_ID,
    googleClientSecret: process.env.OAUTH_GOOGLE_SECRET,
    twitterConsumerKey: process.env.OAUTH_TWITTER_CONSUMER_KEY,
    twitterConsumerSecret: process.env.OAUTH_TWITTER_CONSUMER_SECRET,
  },
  paystack: {
    verifyUrl: process.env.PAYSTACK_VERIFY,
    secret: process.env.PAYSTACK_SECRET,
  },
  sendgridApiKey: process.env.SENDGRID_API_KEY,
  fromEmail: process.env.FROM_EMAIL,
});
