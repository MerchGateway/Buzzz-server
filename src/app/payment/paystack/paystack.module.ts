import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { PaystackBrokerService } from './paystack.service';
import { PaystackBrokerController } from './paystack.controller';
import { PaymentReceipt } from '../entities/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/app/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentReceipt]), ProductModule],
  controllers: [PaystackBrokerController],
  providers: [PaystackBrokerService, ProductModule],
})
export class PaystackBrokerModule {}
