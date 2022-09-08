import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Inject,
  Delete,
} from '@nestjs/common';
import { CreatePayRefDto, PaymentReceiptDto } from '../dto/create-pay-ref-dto';
import { PaystackBrokerService } from './paystack.service';
import { ProductService } from 'src/app/product/product.service';
import { PaymentReceipt } from '../entities/payment.entity';

//TODO: link payment with transactionentity
@Controller('payment/paystack')
export class PaystackBrokerController {
  constructor(
    @Inject(PaystackBrokerService)
    private readonly paystackService: PaystackBrokerService,

    @Inject(ProductService)
    private readonly productService: ProductService,
  ) {}

  @Post('create-payment-ref')
  public createPayRef(@Body() body: CreatePayRefDto) {
    return this.paystackService.createPayRef(body);
  }
  @Get('verify-payment/:reference')
  public verifyPayment(@Param('reference') reference: string) {
    return this.paystackService.verifyPayment(reference);
  }
  @Post('create-refund')
  public createRefund(@Body('transaction') transaction: string) {
    return this.paystackService.createRefund(transaction);
  }
  @Post('add-payment-record')
  public async addPayRecord(
    @Body() body: PaymentReceiptDto,
  ): Promise<PaymentReceipt> {
    await this.productService.handleGetAProduct(body.productId);
    const savedRecord = await this.paystackService.addPayRecord(body);
    // update the product as "paid"
    await this.productService.handleUpdatePaymentRecord(
      savedRecord.id,
      body.productId,
    );
    return savedRecord;
  }
  @Delete('remove-payment-record/:recordId')
  public async removePayRecord(@Param('recordId') recordId: string) {
    return this.paystackService.handleRemovePaymentRecord(recordId);
  }
  @Get('record/:id')
  public async getARecord(@Param('id') id: string) {
    return this.paystackService.handleGetARecord(id);
  }
}
