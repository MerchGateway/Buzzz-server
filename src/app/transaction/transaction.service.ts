import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/transaction.dto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsUtils, MoreThanOrEqual, Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import connection from '../payment/paystack/utils/connection';
import { Status as orderStatus } from '../../types/order';
import { User } from '../users/entities/user.entity';
import { OrderService } from '../order/order.service';
import moment from 'moment';
import { AxiosInstance } from 'axios';
import {
  DEFAULT_POLYMAILER_CONTENT,
  PAYSTACK_SUCCESS_MESSAGE,
} from '../../constant';
import { Order } from '../order/entities/order.entity';
import { PolyMailerContent } from '../order/entities/polymailer_content.entity';
import { Status } from 'src/types/transaction';
import { CustomersService } from '../customers/customers.service';
import { ProductService } from '../product/product.service';
import { paginate } from 'nestjs-typeorm-paginate';
@Injectable()
export class TransactionService {
  axiosConnection: AxiosInstance;
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(PolyMailerContent)
    private readonly polyMailerContentRepository: Repository<PolyMailerContent>,
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
      const transaction = this.transactionRepository.create({
        reference,
        user,
        message,
        orders,
      });

      return await this.transactionRepository.save(transaction);
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async getTransactionsForAuthUser(
    user: User,
    { limit, page, route }: IPaginationOptions,
  ): Promise<Pagination<Transaction>> {
    try {
      // const transactions = await this.transactionRepository.find({
      //   where: {
      //     user: { id: user.id },
      //   },
      // });

      const qb = this.transactionRepository.createQueryBuilder('transaction');
      FindOptionsUtils.joinEagerRelations(
        qb,
        qb.alias,
        this.transactionRepository.metadata,
      );
      qb.leftJoinAndSelect('transaction.user', 'user').where('user.id=:user', {
        user: user.id,
      });

      return paginate<Transaction>(qb, { limit, page, route });
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }
  public async getTransactions({
    limit,
    page,
    route,
  }: IPaginationOptions): Promise<Pagination<Transaction>> {
    try {
      const qb = this.transactionRepository.createQueryBuilder('transaction');
      FindOptionsUtils.joinEagerRelations(
        qb,
        qb.alias,
        this.transactionRepository.metadata,
      );
      qb.leftJoinAndSelect('transaction.user', 'user');

      // const transactions = await this.transactionRepository.find({
      //   relations: ['user'],
      // });
      return paginate<Transaction>(qb, { limit, page, route });
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
  ): Promise<string> {
    // create connection instance of axios
    this.axiosConnection = connection();
    try {
      const isTransaction = await this.transactionRepository.findOneBy({
        reference,
      });

      if (!isTransaction) {
        throw new NotFoundException(
          `Transaction with reference ${reference} does not exist`,
        );
      }

      //verify transactiion status
      await this.axiosConnection
        .get(`/transaction/verify/${reference}`)
        .then(async (res: any) => {
          if (
            res.data &&
            res.data.data.status === 'success' &&
            res.data.message === PAYSTACK_SUCCESS_MESSAGE
          ) {
            isTransaction.fee = res.data.data.fees;
            isTransaction.currency = res.data.data.currency;
            isTransaction.channel = res.data.data.channel;
            isTransaction.amount = res.data.data.amount;
            isTransaction.message = 'Transaction successful';
            isTransaction.status = Status.SUCCESS;

            // set the status of order to paid on successful payment verification
            await Promise.all(
              isTransaction.orders.map(async (order) => {
                await order.updateStatus(orderStatus.PAID);

                // fetch polymailerContents
                const polymailerContents: PolyMailerContent[] =
                  await this.polyMailerContentRepository.find();

                // get a random polymailer content
                const random = Math.floor(
                  Math.random() * polymailerContents.length,
                );
                console.log(
                  random,
                  order.user.name.split(' ')[0],
                  order.product.seller.name.split(' ')[0],
                );

                // set polymailer details
                order.polymailer_details = {
                  to: order.user.name.split(' ')[0],
                  from: order.product.seller.name.split(' ')[0],
                  content: polymailerContents[0]
                    ? polymailerContents[random].content
                    : DEFAULT_POLYMAILER_CONTENT,
                };
                console.log(order);
                await order.save();
              }),
            );
          } else {
            isTransaction.fee = res.data.data.fees;
            isTransaction.currency = res.data.data.currency;
            isTransaction.channel = res.data.data.channel;
            isTransaction.amount = res.data.data.amount;
            isTransaction.status = Status.FAILED;
            isTransaction.message = 'Transaction verification failed';
            await Promise.all(
              isTransaction.orders.map(async (order) => {
                await order.updateStatus(orderStatus.CANCELLED);
                await order.save();
              }),
            );
          }
        })
        .catch(async (err: any) => {
          isTransaction.status = Status.FAILED;
          isTransaction.message = err.message;
          await Promise.all(
            isTransaction.orders.map(async (order) => {
              await order.updateStatus(orderStatus.CANCELLED);
              return await order.save();
            }),
          );
        });
      //

      await this.transactionRepository.save(isTransaction);

      // TODO: map throught the orders and do this for all product in the order
      const res = await this.getATransaction(isTransaction.id);
      const product = await this.productService.handleGetAProduct(
        res.orders[0].product.id,
      );
      // console.log(res)
      // add user to customer list
      await this.customerService.create(product.seller.id, res.user);
      // return res;
      return   isTransaction.message;
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

  public async salesAnalytics(
    query: string,
  ): Promise<Transaction[] | undefined> {
    const Moment = moment();
    let report: Transaction[];
    try {
      if (query === 'current-week') {
        const start = Moment.startOf('week').format('YYYY-MM-DD');

        const end = Moment.endOf('week').format('YYYY-MM-DD');

        report = await this.transactionRepository
          .createQueryBuilder('transaction')
          .select('SUM(transaction.amount)', 'sum')
          .addSelect('WEEKDAY(transaction.updated_at)', 'week-day')
          .where('transaction.status = :status', {
            status: Status.SUCCESS,
          })
          .andWhere(`transaction.updated_at BETWEEN '${start}' AND '${end}'`)
          .groupBy('WEEKDAY(transaction.updated_at)')
          .orderBy('WEEKDAY(transaction.updated_at)')
          .getRawMany();
      } else if (query === 'current-month') {
        const start = Moment.startOf('month').format('YYYY-MM-DD');

        const end = Moment.endOf('month').format('YYYY-MM-DD');

        report = await this.transactionRepository
          .createQueryBuilder('transaction')
          .select('SUM(transaction.amount)', 'sum')
          .addSelect('WEEKDAY(transaction.updated_at)', 'week-day')
          .where('transaction.status = :status', {
            status: Status.SUCCESS,
          })
          .andWhere(`transaction.updated_at BETWEEN '${start}' AND '${end}'`)
          .groupBy('WEEKDAY(transaction.updated_at)')
          .orderBy('WEEKDAY(transaction.updated_at)')
          .getRawMany();
      } else {
        const start = Moment.startOf('year').format('YYYY-MM-DD');

        const end = Moment.endOf('year').format('YYYY-MM-DD');

        report = await this.transactionRepository
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
      }
      return report;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }
}
