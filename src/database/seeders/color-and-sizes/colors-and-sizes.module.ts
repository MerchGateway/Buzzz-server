import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorsAndSizes } from 'src/app/colors-and-sizes/entities/colors-and-sizes.entity';
import { ColorAndSizesSeederService } from './colors-and-sizes.service';
@Module({
  imports: [TypeOrmModule.forFeature([ColorsAndSizes])],
  providers: [ColorAndSizesSeederService],
  exports: [ColorAndSizesSeederService],
})
export class ColorAndSizesSeederModule {}
