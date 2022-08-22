import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from '../Order/order.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), OrderModule],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransctionModule {}
