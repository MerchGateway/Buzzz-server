import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
// import { CreateTransactionDto } from './dto/transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { User } from '../users/entities/user.entity';
import { OrderService } from '../order/order.service';
import { Order } from '../order/entities/order.entity';
import { CustomersService } from '../customers/customers.service';
import { ProductService } from '../product/product.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly orderService: OrderService,
    private readonly customerService: CustomersService,
    private readonly productService: ProductService,
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

  private async getATransaction(
    transactionId: string,
  ): Promise<Transaction | undefined> {
    const transaction = await this.transactionRepository.findOne({
      where: { id: transactionId },
      relations: { user: true, orders: true },
    });

    if (!transaction) {
      throw new NotFoundException(
        `transaction with id ${transactionId} not found`,
      );
    }
    return transaction;
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
      await this.transactionRepository.save(isTransaction);

      // TODO: handle this a better way
      const res = await this.getATransaction(isTransaction.id);
      const product = await this.productService.handleGetAProduct(
        res.orders[0].product.id,
      );
      // add user to customer list
      await this.customerService.create(product.seller.id, res.user.id);
      return res;
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
      console.log(err);
      throw new HttpException(err.message, err.status);
    }
  }
}
