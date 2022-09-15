import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { User } from 'src/app/users/entities/user.entity';
import configuration from 'src/config/configuration';
import { config as envConfig } from 'dotenv';
import { CreatePayRefDto, PaymentReceiptDto } from '../dto/create-pay-ref-dto';
import { PaymentReceipt } from '../entities/payment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import connection from 'src/app/payment/paystack/utils/connection';
import { CartService } from 'src/app/cart/cart.service';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { Cart } from 'src/app/cart/entities/cart.entity';
import { UsersService } from 'src/app/users/users.service';
import { UpdateUserDto } from 'src/app/users/dto/update-user.dto';

envConfig();

@Injectable()
export class PaystackBrokerService {
  axiosConnection: AxiosInstance;

  constructor(
    @InjectRepository(PaymentReceipt)
    private readonly paymentRepository: Repository<PaymentReceipt>,
    private readonly cartService: CartService,
    private readonly userService: UsersService,
    private readonly transactionService: TransactionService,
  ) {
    const config = configuration();
    // create connection instance of axios
    this.axiosConnection = connection();

    // this.axiosConnection = axios.create({
    //   baseURL: 'https://api.paystack.co',
    //   headers: {
    //     authorization: `Bearer ${config.broker.paystackSecretKey}`,
    //     'Content-Type': 'application/json',
    //   },
    // });
  }
  // Create payment Ref (initialize transaction)
  public async createPayRef(
    
    user: User,
  ): Promise<{
    authorization_url: string;
    access_code: string;
    reference: string;
  }> {
    // create payload values to be sent to paystack
    let payload: { email: string; amount: number } = {
      email: user.email,

      amount: 0,
    };

    // get all cart items
    let cartItems: Cart[] = await this.cartService.getCartItems(user);

    //compute the total price of all cart items

    await Promise.all(
      cartItems.map((item) => {
        payload.amount += item.total;
      }),
    );


    // initialize transaction
    return await this.axiosConnection
      .post('/transaction/initialize', payload)
      .then(async (res) => {
        console.log(res);
        // return res.data= {
        //   data: {
        //     authorization_url: string;
        //     access_code: string;
        //     reference: string;
        //   }}

        // create transaction on payment initalize
        await this.transactionService.createTransaction(res.data?.reference,user)
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
        throw new HttpException(
          err.message === 'timeout of 2000ms exceeded'
            ? 'Unable to connect with paystack'
            : err.message,
          err.statusCode || 500,
        );
      });
    // initialize payment
    // const init: {
    //   status: boolean;
    //   message: string;
    //   data: {
    //     authorization_url: string;
    //     access_code: string;
    //     reference: string;
    //   };
    // } = await this.axiosConnection.post('/transaction/initialize', payload);

    // console.log('na init be this o', init);

    // return authorization data for users to complete their transactions
  }

  // public async verifyPayment(ref: string) {
  //   const verify = await this.axiosConnection.get(`/transaction/verify/${ref}`);
  //   return { data: verify.data };
  // }

  public async createRefund(transaction: string) {
    // console.log(transaction);
    const refund = await this.axiosConnection.post('/refund', { transaction });
    return { data: refund.data };
  }

  // public async addPayRecord(body: PaymentReceiptDto) {
  //   await this.verifyPayment(body.reference);
  //   await this.checkIfPayRefExists(body.reference);
  //   const record: PaymentReceipt = new PaymentReceipt();

  //   record.user_id = body.user_id;
  //   record.currency = body.currency;
  //   record.reference = body.reference;
  //   record.broker = body.broker;
  //   record.payment_status = body.payment_status;

  //   return this.paymentRepository.save(record);
  // }

  private async handleGetPayRecord(id: string) {
    const record = await this.paymentRepository.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException(`payment record for ${id} not found`);
    }
    return record;
  }

  // checks if the pay ref exists i  the database already
  private async checkIfPayRefExists(ref: string) {
    const payRef = await this.paymentRepository.findOne({
      where: { reference: ref },
    });
    if (payRef) {
      throw new ConflictException(
        'A record is already associated with this payment reference',
      );
    }
    return;
  }

  public async handleRemovePaymentRecord(recordId: string) {
    try {
      const record = await this.handleGetPayRecord(recordId);
      await this.paymentRepository.delete(recordId);
      return record;
    } catch (err) {
      throw err;
    }
  }

  public async handleGetARecord(id: string) {
    try {
      const record = await this.paymentRepository.findOne({
        where: {
          id,
        },
        relations: {
          product: true,
        },
      });
      if (!record) {
        throw new NotFoundException('no record found');
      }
      return record;
    } catch (err) {
      throw err;
    }
  }
}
