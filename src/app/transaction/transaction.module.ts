import { Module, forwardRef } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from '../order/order.module';
import { CartModule } from '../cart/cart.module';
import { ProductModule } from '../product/product.module';
import { CustomersModule } from '../customers/customers.module';
import { PolymailerContent } from '../order/entities/polymailer-content.entity';
import { FeeModule } from '../fee/fee.module';
import { MailModule } from '../../mail/mail.module';
import { PaystackBrokerModule } from '../payment/paystack/paystack.module';
import { GiftModule } from '../gifting/gift.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, PolymailerContent]),
    forwardRef(() => OrderModule),
    CartModule,
    ProductModule,
    CustomersModule,
    FeeModule,
    MailModule,
    GiftModule,
    forwardRef(() => PaystackBrokerModule),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
