import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from '../order/order.module';
import { CartModule } from '../cart/cart.module';
import { ProductModule } from '../product/product.module';
import { CustomersModule } from '../customers/customers.module';
import { PolyMailerContent } from '../order/entities/polymailer_content.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction,PolyMailerContent]),
    OrderModule,
    CartModule,
    ProductModule,
    CustomersModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
