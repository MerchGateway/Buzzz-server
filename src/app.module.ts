import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import configuration from './config/configuration';
import { CategoryModule } from './app/category/category.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CategoryModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
