import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { CategoryModule } from '../category/category.module';
import { CLOUDINARY } from 'src/constant';
import { CloudinaryProvider } from 'src/providers/cloudinary.provider';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoryModule],
  controllers: [ProductController],
  providers: [ProductService, CategoryModule,  {
    provide: CLOUDINARY,
    useFactory: (configService: ConfigService) => {
      return new CloudinaryProvider(configService);
    },
    inject: [ConfigService],
  },],
  exports: [ProductService],
})
export class ProductModule {}
