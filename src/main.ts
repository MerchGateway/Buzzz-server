import { ValidationPipe } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import createDefaultCategories from './utils/createDefaultCategories';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();
  // const config: ConfigService = app.get(ConfigService);
  // const port: number = config.get<number>('port');
  await app.listen(process.env.PORT || 5000);
  // create default categories after all routes must have loaded
  createDefaultCategories();
}
bootstrap();
