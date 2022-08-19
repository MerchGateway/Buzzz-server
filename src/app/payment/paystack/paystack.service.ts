import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import configuration from 'src/config/configuration';
import { config as envConfig } from 'dotenv';
import { CreatePayRefDto, PaymentReceiptDto } from '../dto/create-pay-ref-dto';
import { PaymentReceipt } from '../entities/payment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

envConfig();

@Injectable()
export class PaystackBrokerService {
  client: AxiosInstance;
  constructor(
    @InjectRepository(PaymentReceipt)
    private readonly paymentRepository: Repository<PaymentReceipt>,
  ) {
    const config = configuration();

    this.client = axios.create({
      baseURL: 'https://api.paystack.co',
      headers: {
        authorization: `Bearer ${config.broker.paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  // Create payment Ref (initialize transaction)
  public async createPayRef(body: CreatePayRefDto) {
    const init = await this.client.post('/transaction/initialize', body);
    return { data: init.data };
  }

  public async verifyPayment(ref: string) {
    const verify = await this.client.get(`/transaction/verify/${ref}`);
    return { data: verify.data };
  }

  public async createRefund(transaction: string) {
    // console.log(transaction);
    const refund = await this.client.post('/refund', { transaction });
    return { data: refund.data };
  }

  public async addPayRecord(body: PaymentReceiptDto) {
    await this.verifyPayment(body.reference);
    await this.checkIfPayRefExists(body.reference);
    const record: PaymentReceipt = new PaymentReceipt();

    record.user_id = body.user_id;
    record.currency = body.currency;
    record.reference = body.reference;
    record.broker = body.broker;
    record.payment_status = body.payment_status;

    return this.paymentRepository.save(record);
  }

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
