import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsUtils, Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import connection from '../payment/paystack/utils/connection';
import { Status as orderStatus } from '../../types/order';
import { User } from '../users/entities/user.entity';
import { OrderService } from '../order/order.service';
import moment from 'moment';
import { AxiosInstance } from 'axios';
import {
  DEFAULT_POLY_MAILER_CONTENT,
  PAYSTACK_SUCCESS_MESSAGE,
} from '../../constant';
import { Order } from '../order/entities/order.entity';
import { PolymailerContent } from '../order/entities/polymailer-content.entity';
import { TransactionMethod, TransactionStatus } from 'src/types/transaction';
import { CustomersService } from '../customers/customers.service';
import { ProductService } from '../product/product.service';
import { paginate } from 'nestjs-typeorm-paginate';
import { resolve } from 'path';

@Injectable()
export class TransactionService {
  axiosConnection: AxiosInstance;
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(PolymailerContent)
    private readonly polyMailerContentRepository: Repository<PolymailerContent>,
    private readonly orderService: OrderService,
    private readonly customerService: CustomersService,
    private readonly productService: ProductService,
  ) {}

  public async createTransaction(
    reference: string,
    user: User,
    message: string,
  ): Promise<Transaction> {
    //create order
    const orders: Order[] = await this.orderService.createOrder(
      { shippingAddress: user.shippingAddress },
      user,
    );

    const totalCost = orders.reduce((acc, order) => {
      return acc + order.total;
    }, 0);

    const transaction = this.transactionRepository.create({
      reference,
      wallet: user.wallet,
      message,
      orders,
      amount: totalCost,
    });

    return await this.transactionRepository.save(transaction);
  }

  public async getTransactionsForAuthUser(
    user: User,
    { limit, page, route }: IPaginationOptions,
  ): Promise<Pagination<Transaction>> {
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
    // qb.leftJoinAndSelect('transaction.wallet', 'wallet').where(
    //   'wallet.user.id = :user',
    //   {
    //     user: user.id,
    //   },
    // );
    // qb.leftJoinAndSelect('transaction.wallet', 'wallet').where('wallet.id = :user', {
    //   user: user.id,
    // });
    // select nested relations
    qb.leftJoinAndSelect('transaction.wallet', 'wallet');

    return paginate<Transaction>(qb, { limit, page, route });
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
  private async getATransaction(transactionId: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({
      where: { id: transactionId },
      // TODO: select only necessary fields
      relations: { orders: true },
    });

    if (!transaction) {
      throw new NotFoundException(
        `Transaction with id ${transactionId} not found`,
      );
    }
    return transaction;
  }

  public async verifyTransaction(reference: string): Promise<string> {
    let response: string;

    // read files
    // const transactionSuccess = readFileSync(
    //   resolve(__dirname,'..','..','..','public/transaction-success.html'),
    //   { encoding: 'utf-8' },
    // );
    // const transactionFail = readFileSync(
    //   resolve(__dirname,'..','..','..','public/transaction-fail.html'),
    //   { encoding: 'utf-8' },
    // );
    const transactionSuccess = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'public/transaction-success.html',
    );
    const transactionFail = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'public/transaction-fail.html',
    );
    // create connection instance of axios
    this.axiosConnection = connection();

    const transactionToVerify = await this.transactionRepository.findOneBy({
      reference,
    });

    if (!transactionToVerify) {
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
          transactionToVerify.currency = res.data.data.currency;
          transactionToVerify.channel = res.data.data.channel;
          transactionToVerify.amount = res.data.data.amount;
          transactionToVerify.message = 'Transaction successful';
          transactionToVerify.status = TransactionStatus.SUCCESS;

          // set the status of order to paid on successful payment verification
          await Promise.all(
            transactionToVerify.orders.map(async (order) => {
              await order.updateStatus(orderStatus.PAID);

              // fetch polymailerContents
              const polymailerContents: PolymailerContent[] =
                await this.polyMailerContentRepository.find();

              // get a random polymailer content
              const random = Math.floor(
                Math.random() * polymailerContents.length,
              );
              console.log(
                random,
                order.user.firstName.split(' ')[0],
                order.product.seller.firstName.split(' ')[0],
              );

              // set polymailer details
              order.polymailerDetails = {
                to: order.user.firstName.split(' ')[0],
                from: order.product.seller.firstName.split(' ')[0],
                content: polymailerContents[0]
                  ? polymailerContents[random].content
                  : DEFAULT_POLY_MAILER_CONTENT,
              };
              console.log(order);

              await order.save();
            }),
          );
          response = transactionSuccess;
        } else {
          transactionToVerify.currency = res.data.data.currency;
          transactionToVerify.channel = res.data.data.channel;
          transactionToVerify.amount = res.data.data.amount;
          transactionToVerify.status = TransactionStatus.FAILED;
          transactionToVerify.message = 'Transaction verification failed';
          await Promise.all(
            transactionToVerify.orders.map(async (order) => {
              await order.updateStatus(orderStatus.CANCELLED);
              await order.save();
            }),
          );
          response = transactionFail;
        }
      })
      .catch(async (err: any) => {
        transactionToVerify.status = TransactionStatus.FAILED;
        transactionToVerify.message = err.message;
        await Promise.all(
          transactionToVerify.orders.map(async (order) => {
            await order.updateStatus(orderStatus.CANCELLED);
            return await order.save();
          }),
        );
        response = transactionFail;
      });
    //

    await this.transactionRepository.save(transactionToVerify);

    // TODO: map through the orders and do this for all product in the order
    const res = await this.transactionRepository.findOne({
      where: { id: transactionToVerify.id },
      relations: [
        'orders',
        'orders.product',
        'orders.product.seller',
        'wallet',
        'wallet.user',
      ],
    });
    const product = await this.productService.handleGetAProduct(
      res.orders[0].product.id,
    );
    // add user to customer list
    await this.customerService.create(product.seller.id, res.wallet.user);
    // return res;
    return response;
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
            status: TransactionStatus.SUCCESS,
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
            status: TransactionStatus.SUCCESS,
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
            status: TransactionStatus.SUCCESS,
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

  async getBalanceForWalletId(walletId: string) {
    const creditsResult = await this.transactionRepository
      .createQueryBuilder('transaction')
      .select('SUM(transaction.amount)', 'sum')
      .where('transaction.wallet_id = :walletId', { walletId })
      .andWhere('transaction.method = :method', {
        method: TransactionMethod.CREDIT,
      })
      .andWhere('transaction.status != :status', {
        status: TransactionStatus.FAILED,
      })
      .getRawOne();

    const debitsResult = await this.transactionRepository
      .createQueryBuilder('transaction')
      .select('SUM(transaction.amount)', 'sum')
      .where('transaction.wallet_id = :walletId', { walletId })
      .andWhere('transaction.method = :method', {
        method: TransactionMethod.DEBIT,
      })
      .andWhere('transaction.status != :status', {
        status: TransactionStatus.FAILED,
      })
      .getRawOne();

    const availableBalance = (creditsResult.sum || 0) - (debitsResult.sum || 0);

    return availableBalance;
  }
}
