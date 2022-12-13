import { Module } from '@nestjs/common';
import { WalletTransactionsService } from './wallet-transactions.service';
import { WalletTransactionsController } from './wallet-transactions.controller';
import { WalletTransaction } from './entities/wallet-transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([WalletTransaction])],
  controllers: [WalletTransactionsController],
  providers: [WalletTransactionsService],
  exports: [WalletTransactionsService],
})
export class WalletTransactionsModule {}
