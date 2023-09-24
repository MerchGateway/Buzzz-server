import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWalletTransactionDto } from './dto/create-wallet-transaction.dto';
import { UpdateWalletTransactionDto } from './dto/update-wallet-transaction.dto';
import {
  TransactionMethod,
  TransactionStatus,
  WalletTransaction,
} from './entities/wallet-transaction.entity';

@Injectable()
export class WalletTransactionsService {
  constructor(
    @InjectRepository(WalletTransaction)
    private readonly walletTransactionRepository: Repository<WalletTransaction>,
  ) {}

  async create(createWalletTransactionDto: CreateWalletTransactionDto) {
    const transaction = this.walletTransactionRepository.create(
      createWalletTransactionDto,
    );
    return await this.walletTransactionRepository.save(transaction);
  }

  findAll() {
    return `This action returns all walletTransactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} walletTransaction`;
  }

  update(id: number, updateWalletTransactionDto: UpdateWalletTransactionDto) {
    return `This action updates a #${id} walletTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} walletTransaction`;
  }

  async getBalanceForWalletId(walletId: string) {
    const creditsResult = await this.walletTransactionRepository
      .createQueryBuilder('transaction')
      .select('SUM(transaction.amount)', 'sum')
      .where('transaction.wallet_id = :walletId', { walletId })
      .andWhere('transaction.method = :method', {
        method: TransactionMethod.CREDIT,
      })
      .andWhere('transaction.status != :status', {
        status: TransactionStatus.FAILED,
      })
      .getRawOne();

    const debitsResult = await this.walletTransactionRepository
      .createQueryBuilder('transaction')
      .select('SUM(transaction.amount)', 'sum')
      .where('transaction.wallet_id = :walletId', { walletId })
      .andWhere('transaction.method = :method', {
        method: TransactionMethod.DEBIT,
      })
      .andWhere('transaction.status != :status', {
        status: TransactionStatus.FAILED,
      })
      .getRawOne();

    const availableBalance = (creditsResult.sum || 0) - (debitsResult.sum || 0);

    return availableBalance;
  }
}
