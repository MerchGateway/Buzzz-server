import { ValidationPipe } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import createDefaultCategories from './utils/createDefaultCategories';
import createSuperAdmin from './utils/createSuperAdmin';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('v1');
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();
  // const config: ConfigService = app.get(ConfigService);
  // const port: number = config.get<number>('port');
  app.use(express.static(join(__dirname, 'public')));
  app.set('view engine', 'html');
  app.engine('html', require('ejs').renderFile);
  // app.setViewEngine('ejs');
  await app.listen(process.env.PORT || 8080);
  // create default categories after all routes must have loaded
  createDefaultCategories();
  createSuperAdmin();
}
bootstrap();
