import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Inject,
  Delete,
} from '@nestjs/common';
import { PaystackBrokerService } from './paystack.service';
import { ProductService } from 'src/app/product/product.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from 'src/app/users/entities/user.entity';

//TODO: link payment with transactionentity
@Controller('payment/paystack')
export class PaystackBrokerController {
  constructor(
    @Inject(PaystackBrokerService)
    private readonly paystackService: PaystackBrokerService,

    @Inject(ProductService)
    private readonly productService: ProductService,
  ) {}

  @Get('create-payment-ref')
  public createPayRef(@CurrentUser() user: User) {
    return this.paystackService.createPayRefForCart(user);
  }

  @Post('create-refund')
  public createRefund(@Body('transaction') transaction: string) {
    return this.paystackService.createRefund(transaction);
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
