import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AxiosInstance } from 'axios';

import { User } from 'src/app/users/entities/user.entity';
// import configuration  from 'src/config/configuration';
import { config as envConfig } from 'dotenv';
// import { CreatePayRefDto, PaymentReceiptDto } from '../dto/create-pay-ref-dto';
import { PaymentReceipt } from '../entities/payment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import connection from 'src/app/payment/paystack/utils/connection';
import { CartService } from 'src/app/cart/cart.service';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { Cart } from 'src/app/cart/entities/cart.entity';
import { UsersService } from 'src/app/users/users.service';
// import { UpdateUserDto } from 'src/app/users/dto/update-user.dto';

envConfig();

@Injectable()
export class PaystackBrokerService {
  axiosConnection: AxiosInstance;

  constructor(
    @InjectRepository(PaymentReceipt)
    private readonly paymentRepository: Repository<PaymentReceipt>,
    private readonly cartService: CartService,
   
    private readonly transactionService: TransactionService,
  ) {

    this.axiosConnection = connection();


  }
  // Create payment Ref (initialize transaction)
  public async createPayRef(user: User): Promise<{
    authorization_url: string;
    access_code: string;
    reference: string;
  }> {
    // create payload values to be sent to paystack
    const payload: { email: string; amount: number } = {
      email: user.email,
      amount: 0,
    };

    // get all cart items
    const cartItems: Cart[] = await this.cartService.getCartItems(user);
    // console.log(cartItems.length);
    if (cartItems.length === 0) {
      throw new NotFoundException(
        'you must have item(s) in your cart before creating a payment',
      );
    }

    //compute the total price of all cart items

    await Promise.all(
      cartItems.map((item) => {
        payload.amount += item.total;
      }),
    );
    // set payload amount to the smallest decimal
    payload.amount = payload.amount * 100;
    // initialize transaction
    return await this.axiosConnection
      .post('/transaction/initialize', payload)
      .then(async (res) => {
    
        // create transaction on payment initalize
        await this.transactionService.createTransaction(
          res.data?.data.reference,
          user,
          res.data?.message,
        );
        return res.data.data;
      })
      .catch((err) => {
        throw new HttpException(err.message, err.statusCode || 500);
      });
   
  }

  public async createRefund(transaction: string) {
    // console.log(transaction);
    const refund = await this.axiosConnection.post('/refund', { transaction });
    return { data: refund.data };
  }

  private async handleGetPayRecord(id: string) {
    const record = await this.paymentRepository.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException(`payment record for ${id} not found`);
    }
    return record;
  }

  // checks if the pay ref exists in  the database already
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
