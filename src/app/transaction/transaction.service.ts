import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { User } from '../users/entities/user.entity';
import { OrderService } from '../order/order.service';
import * as moment from 'moment';
import { Order } from '../order/entities/order.entity';
import { Status } from 'src/types/transaction';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly orderService: OrderService,
  ) {}

  public async createTransaction(
    reference: string,
    user: User,
    message: string,
  ): Promise<Transaction | undefined> {
    try {
      //create order
      const orders: Order[] = await this.orderService.createOrder(
        { shipping_address: user.shipping_address },
        user,
      );

      const Transaction = this.transactionRepository.create({
        reference,
        user,
        message,
        orders,
      });

      await this.transactionRepository.save(Transaction);
      // fetch fresh copy of the just created transaction
      const cleanTransaction = await this.transactionRepository.findOne({
        where: { id: Transaction.id },
        relations: { orders: true },
      });
      return cleanTransaction;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async getTransactionsForAuthUser(
    user: User,
  ): Promise<Transaction[] | undefined> {
    try {
      const transactions = await this.transactionRepository.find({
        where: {
          user: { id: user.id },
        },
      });
      return transactions;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async verifyTransaction(
    reference: string,
  ): Promise<Transaction | undefined> {
    try {
      const isTransaction = await this.transactionRepository.findOneBy({
        reference,
      });

      if (!isTransaction) {
        throw new NotFoundException(
          `Transaction with reference ${reference} does not exist`,
        );
      }

      await isTransaction.verifyTransaction();
      return await this.transactionRepository.save(isTransaction);
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async deleteTransaction(
    reference: string,
  ): Promise<Transaction | undefined> {
    try {
      const isTransaction = await this.transactionRepository.findOneBy({
        reference,
      });

      if (!isTransaction) {
        throw new NotFoundException(
          `Transaction with reference ${reference} does not exist`,
        );
      }

      await this.transactionRepository.delete({ reference });
      return isTransaction;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async salesAnalytics(
    query: string,
  ): Promise<Transaction[] | undefined> {
    const Moment = moment();

    try {
      if (query === 'current-week') {
        const start = Moment.startOf('week').format('YYYY-MM-DD');
        const end = Moment.endOf('week').format('YYYY-MM-DD');

        const report = await this.transactionRepository
          .createQueryBuilder('transaction')
          .select('SUM(transaction.amount)', 'sum')
          .addSelect('EXTRACT (DAY FROM transaction.updated_at)', 'week-day')
          .where('transaction.status = :status', {
            status: Status.SUCCESS,
          })
          .andWhere(`transaction.updated_at BETWEEN '${start}' AND '${end}'`)
          .groupBy('EXTRACT (DAY FROM transaction.updated_at)')
          .orderBy('EXTRACT (DAY FROM transaction.updated_at)')
          .getRawMany();
        return report;
      } else if (query === 'current-month') {
        const start = Moment.startOf('month').format('YYYY-MM-DD');
        const end = Moment.endOf('month').format('YYYY-MM-DD');

        const report = await this.transactionRepository
          .createQueryBuilder('transaction')
          .select('SUM(transaction.amount)', 'sum')
          .addSelect('EXTRACT DAY FROM transaction.updated_at)', 'week-day')
          .where('transaction.status = :status', {
            status: Status.SUCCESS,
          })
          .andWhere(`transaction.updated_at BETWEEN '${start}' AND '${end}'`)
          .groupBy('EXTRACT DAY FROM transaction.updated_at)')
          .orderBy('EXTRACT DAY FROM transaction.updated_at)')
          .getRawMany();
        return report;
      } else {
        const start = Moment.startOf('year').format('YYYY-MM-DD');
        const end = Moment.endOf('year').format('YYYY-MM-DD');

        const report = await this.transactionRepository
          .createQueryBuilder('transaction')
          .select('SUM(transaction.amount)', 'sum')
          .addSelect('EXTRACT (MONTH FROM transaction.updated_at)', 'month')
          .where('transaction.status = :status', {
            status: Status.SUCCESS,
          })
          .andWhere(`transaction.updated_at BETWEEN '${start}' AND '${end}'`)
          .groupBy('EXTRACT (MONTH FROM transaction.updated_at)')
          .orderBy('EXTRACT (MONTH FROM transaction.updated_at)')
          .getRawMany();
        return report;
      }
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }
}
