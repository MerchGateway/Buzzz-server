import { Injectable, HttpException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { User } from '../users/entities/user.entity';
import { OrderService } from '../order/order.service';
import * as moment from 'moment';
import { Status } from 'src/types/transaction';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly orderService: OrderService,
  ) {}

  public async createTransaction(
    payload: CreateTransactionDto,
    user: User,
  ): Promise<Transaction | undefined> {
    try {
      // fetch all orders created by the user

      const orders = await this.orderService.getOrders(user);
      const Transaction = this.transactionRepository.create({
        reference: payload.reference,
        user,
        orders,
      });
      await this.transactionRepository.save(Transaction);
      // fetch fresh copy of the just created transaction
      const cleanTransaction = await this.transactionRepository.findOne({
        where: { id: Transaction.id },
      });
      return cleanTransaction;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async salesAnalytics(query: string): Promise<Transaction | undefined> {
    const Moment = moment();
    try {
      if (query === 'current-week') {
        const start = Moment.startOf('week').format('YYYY-MM-DD');
        const end = new Date(Date.now()).toISOString();

        await this.transactionRepository
          .createQueryBuilder('transaction')
          .select('day')
          .from('transaction.updatedAt', 'updatedAt')

          .where(`transaction.updatedAt BETWEEN '${start}' AND '${end}'`)
          .andWhere('transaction.status = :status', {
            status: Status.SUCCESS,
          })
          .groupBy('transaction.day')
          .getMany();
      } else if (query === 'current-month') {
        const start = Moment.startOf('month').format('YYYY-MM-DD');
        const end = new Date(Date.now()).toISOString();

        await this.transactionRepository
          .createQueryBuilder('transaction')
          .select('week')
          .from('transaction.updatedAt', 'updatedAt')
          .where(`transaction.updatedAt BETWEEN '${start}' AND '${end}'`)
          .andWhere('transaction.status = :status', {
            status: Status.SUCCESS,
          })
          .groupBy('week')
          .getMany();
      } else {
        const start = Moment.startOf('year').format('YYYY-MM-DD');
        const end = new Date(Date.now()).toISOString();

        await this.transactionRepository
          .createQueryBuilder('transaction')
          .select('month')
          .from('transaction.updatedAt', 'updatedAt')
          .where(`transaction.updatedAt BETWEEN '${start}' AND '${end}'`)
          .andWhere('transaction.status = :status', {
            status: Status.SUCCESS,
          })
          .groupBy('month')
          .getMany();
      }
      return;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }
}
