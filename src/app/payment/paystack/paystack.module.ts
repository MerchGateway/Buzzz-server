import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { PaystackBrokerService } from './paystack.service';
import { PaystackBrokerController } from './paystack.controller';
import { PaymentReceipt } from '../entities/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/app/product/product.module';
import { CartModule } from 'src/app/cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentReceipt]),
    ProductModule,
    CartModule,
  ],
  controllers: [PaystackBrokerController],
  providers: [PaystackBrokerService, ProductModule],
})
export class PaystackBrokerModule {}
