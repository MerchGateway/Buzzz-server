import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fee } from '../../../app/fee/entities/fee.entity';
import { FeeSeederService } from './fee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Fee])],
  providers: [FeeSeederService],
  exports: [FeeSeederService],
})
export class FeeSeederModule {}
