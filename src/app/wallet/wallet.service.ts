import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuccessResponse } from '../../utils/response';
import { WalletTransactionsService } from '../wallet-transactions/wallet-transactions.service';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    private walletTransactionService: WalletTransactionsService,
  ) {}

  async createWallet() {
    const wallet = this.walletRepository.create();
    return await this.walletRepository.save(wallet);
  }

  async getByWalletId(walletId: string) {
    const wallet = await this.walletRepository.findOneBy({ id: walletId });

    if (!wallet) {
      throw new NotFoundException(`Wallet ${walletId} not found`);
    }

    const balance = await this.walletTransactionService.getBalanceForWalletId(
      walletId,
    );

    return new SuccessResponse(
      {
        ...wallet,
        balance,
      },
      'wallet retrieved',
      HttpStatus.OK,
    );
  }

  async fundWallet(walletId: string) {
    return {};
  }

  async withdrawFromWallet(walletId: string) {
    return {};
  }
}
