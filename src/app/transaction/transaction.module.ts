import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from '../order/order.module';
import * as moment from 'moment';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), OrderModule],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransctionModule {}
