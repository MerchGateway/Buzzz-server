import { Module, forwardRef } from '@nestjs/common';
import { GiftService } from './gift.service';
import { GiftController } from './gift.controller';
import { Gift } from './entities/gift.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from '../../mail/mail.module';
import { ProductModule } from '../product/product.module';
import { PaystackBrokerModule } from '../payment/paystack/paystack.module';
import { TransactionModule } from '../transaction/transaction.module';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gift]),
    forwardRef(() => TransactionModule),
    MailModule,
    ProductModule,
    PaystackBrokerModule,

    OrderModule,
  ],
  controllers: [GiftController],
  providers: [GiftService],
  exports: [GiftService],
})
export class GiftModule {}
