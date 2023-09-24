import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WithdrawFromWalletDto } from './dto/withdraw-from-wallet.dto';
import { CurrentUser } from '../../decorators/user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get(':walletId')
  findOne(@Param('walletId') walletId: string) {
    return this.walletService.getByWalletId(walletId);
  }

  @Post(':walletId/withdraw')
  withdraw(
    @Body() withdrawFromWalletDto: WithdrawFromWalletDto,
    @CurrentUser() user: User,
  ) {
    return this.walletService.withdrawFromWallet(withdrawFromWalletDto, user);
  }
}
