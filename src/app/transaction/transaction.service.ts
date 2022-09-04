import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { User } from '../users/entities/user.entity';
import { OrderService } from '../order/order.service';

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
      console.log(orders);
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
      const transactions = await this.transactionRepository.find({where:{
        user: { id: user.id }},
        relations: { orders: true },
      });
      return transactions;
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
}
