import { Controller, Get, Param, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get(':walletId')
  findOne(@Param('walletId') walletId: string) {
    return this.walletService.getByWalletId(walletId);
  }

  @Post(':walletId/fund')
  fund(@Param('walletId') walletId: string) {
    return this.walletService.fundWallet(walletId);
  }

  @Post(':walletId/withdraw')
  withdraw(@Param('walletId') walletId: string) {
    return this.walletService.withdrawFromWallet(walletId);
  }
}
