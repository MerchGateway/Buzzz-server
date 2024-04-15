import { Module, forwardRef } from '@nestjs/common';
import { PaystackBrokerService } from './paystack.service';
import { PaystackBrokerController } from './paystack.controller';
import { PaymentReceipt } from '../entities/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/app/product/product.module';
import { CartModule } from 'src/app/cart/cart.module';
import { UsersModule } from 'src/app/users/users.module';
import { TransactionModule } from 'src/app/transaction/transaction.module';
import { DeliveryCostModule } from 'src/app/delivery-cost/delivery-cost.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([PaymentReceipt]),
		ProductModule,
		CartModule,
		forwardRef(() => UsersModule),
		forwardRef(() => TransactionModule),
		DeliveryCostModule,
	],
	controllers: [PaystackBrokerController],
	providers: [PaystackBrokerService],
	exports: [PaystackBrokerService],
})
export class PaystackBrokerModule {}
