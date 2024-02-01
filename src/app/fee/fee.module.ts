import { Module } from '@nestjs/common';
import { FeeService } from './fee.service';
import { FeeController } from './fee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fee } from './entities/fee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fee])],
  controllers: [FeeController],
  providers: [FeeService],
  exports: [FeeService],
})
export class FeeModule {}
