import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import configuration from '../config/configuration';
import { WinstonLoggerService } from '../logger/winston-logger/winston-logger.service';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RequestLoggingInterceptor } from '../request-logging.interceptor';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    WinstonLoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    ,
  ],
})
export class AppModule {}
