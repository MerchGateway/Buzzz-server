import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSeederService } from './user.service';
import { User } from '../../../app/users/entities/user.entity';
import { Category } from '../../../app/category/entities/category.entity';
import { Wallet } from '../../../app/wallet/entities/wallet.entity';
import { Product } from '../../../app/product/entities/product.entity';
import { PaymentReceipt } from '../../../app/payment/entities/payment.entity';
import { Design } from '../../../app/design/entities/design.entity';
import { Transaction } from '../../../app/transaction/entities/transaction.entity';
import { Order } from '../../../app/order/entities/order.entity';
import { Cart } from '../../../app/cart/entities/cart.entity';
import { PrintingPartner } from '../../../app/admin/printing-partners/entities/printing-partner.entity';
import { LogisticsPartner } from '../../../app/admin/logistics-partners/entities/logistics-partner.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Category,
      Product,
      Design,
      PaymentReceipt,
      Wallet,
      Transaction,
      Order,
      Cart,
      PrintingPartner,
      LogisticsPartner,
    ]),
  ],
  providers: [UserSeederService],
  exports: [UserSeederService],
})
export class UserSeederModule {}
