import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Blog } from './entities/blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CLOUDINARY } from '../../constant';
import { ConfigService } from '@nestjs/config';
import { CloudinaryProvider } from '../../providers/cloudinary.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Blog])],
  controllers: [BlogController],
  providers: [
    BlogService,
    {
      provide: CLOUDINARY,
      useFactory: (configService: ConfigService) => {
        return new CloudinaryProvider(configService);
      },
      inject: [ConfigService],
    },
  ],
})
export class BlogModule {}
