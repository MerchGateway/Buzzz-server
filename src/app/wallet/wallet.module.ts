import { Module, forwardRef } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { Wallet } from './entities/wallet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../transaction/entities/transaction.entity';
import { User } from '../users/entities/user.entity';
import { TransactionModule } from '../transaction/transaction.module';
import { PaystackBrokerModule } from '../payment/paystack/paystack.module';
import { AuthModule } from '../auth/auth.module';
import { FeeModule } from '../fee/fee.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wallet, Transaction, User]),
    TransactionModule,
    PaystackBrokerModule,
    forwardRef(() => AuthModule),
    FeeModule,
  ],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
