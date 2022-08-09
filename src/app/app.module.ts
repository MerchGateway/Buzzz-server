import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import configuration from '../config/configuration';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    CategoryModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    DatabaseModule,
  ],
})
export class AppModule {}
