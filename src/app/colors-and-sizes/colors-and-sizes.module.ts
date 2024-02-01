import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorsAndSizes } from 'src/app/colors-and-sizes/entities/colors-and-sizes.entity';
import { ColorAndSizesController } from './colors-and-sizes.controller';
import { ColorAndSizesService } from './colors-and-sizes.service';
@Module({
  imports: [TypeOrmModule.forFeature([ColorsAndSizes])],
  controllers: [ColorAndSizesController],
  providers: [ColorAndSizesService],
  exports: [ColorAndSizesService],
})
export class ColorAndSizesModule {}
