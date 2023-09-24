import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { WalletTransactionsModule } from '../wallet-transactions/wallet-transactions.module';
import { Wallet } from './entities/wallet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentModule } from '../payment/payment.module';
import { Transaction } from '../transaction/entities/transaction.entity';

@Module({
  imports: [
    WalletTransactionsModule,
    TypeOrmModule.forFeature([Wallet, Transaction]),
    PaymentModule,
  ],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
