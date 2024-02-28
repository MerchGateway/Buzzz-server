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
  charset: string; // Set charset to utf8mb4
  collation: string; // Set collation to utf8mb4_unicode_ci
}

export default () => ({
  nodeEnv: process.env.NODE_ENV,
  appUrl: process.env.APP_URL,
  clientUrl: process.env.CLIENT_URL,
  designClientUrl: process.env.DESIGN_CLIENT_URL,
  adminClientUrl: process.env.ADMIN_CLIENT_URL,
  debugClientUrl: process.env.DEBUG_CLIENT_URL,
  debugDesignClientUrl: process.env.DEBUG_DESIGN_CLIENT_URL,
  port: parseInt(process.env.PORT, 10) || 8080,
  database: {
    connection: process.env.TYPEORM_CONNECTION,
    url: process.env.TYPEORM_URL,
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT, 10) || 3306,
    name: process.env.TYPEORM_DATABASE,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    synchronize: JSON.parse(process.env.TYPEORM_SYNCHRONIZE),
    entities: process.env.TYPEORM_ENTITIES,
    migrations: process.env.TYPEORM_MIGRATIONS,
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRE,
    refreshSecret: process.env.REFRESH_JWT_SECRET,
    refreshExpiresIn: process.env.REFRESH_JWT_EXPIRE,
    cookieExpire: process.env.JWT_COOKIE_EXPIRE,
  },
  oauth: {
    googleClientId: process.env.OAUTH_GOOGLE_ID,
    googleClientSecret: process.env.OAUTH_GOOGLE_SECRET,
    twitterConsumerKey: process.env.OAUTH_TWITTER_CONSUMER_KEY,
    twitterConsumerSecret: process.env.OAUTH_TWITTER_CONSUMER_SECRET,
  },
  paystack: {
    secret: process.env.PAYSTACK_SECRET_KEY,
  },
  auth: {
    superPassword: process.env.SUPER_PASSWORD,
    superEmail: process.env.SUPER_EMAIL,
  },
  sendgridApiKey: process.env.SENDGRID_API_KEY,
  fromEmail: process.env.FROM_EMAIL,
  fromName: process.env.FROM_NAME,
  broker: {
    paystackSecretKey: process.env.PAYSTACK_SECRET_KEY,
  },
  firebaseCredentials: {
    type: process.env.TYPE,
    firebase_image_url: process.env.FIREBASE_IMAGE_URL,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  },
  cloudinary: {
    cloud_name: process.env.CLOUD_NAME,
    cloud_api_key: process.env.CLOUD_API_KEY,
    cloud_api_secret: process.env.CLOUD_API_SECRET,
    cloudinary_url: process.env.CLOUDINARY_URL,
  },
  redis: {
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    host: process.env.REDIS_HOST,
    redis_url: process.env.REDIS_URL,
  },
  google: {
    mapApiKey: process.env.GOOGLE_MAP_API_KEY,
  },
  firebaseDatabaseUrl: process.env.FIREBASE_DATABASE_URL,
  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT,
  smtpEmail: process.env.SMTP_EMAIL,
  smtpPassword: process.env.SMTP_PASSWORD,
  passportSessionSecret: process.env.PASSPORT_SESSION_SECRET,
  maxFileUploadSizeInBytes: parseInt(process.env.MAX_FILE_UPLOAD_SIZE_IN_BYTES),
});
