import { Module } from '@nestjs/common';
import { PaystackBrokerModule } from './paystack/paystack.module';
// import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [PaystackBrokerModule],
  controllers: [],
  providers: [],
})
export class PaymentModule {}
