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
        orders
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
}
