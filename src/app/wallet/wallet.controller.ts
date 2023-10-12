import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WithdrawFromWalletDto } from './dto/withdraw-from-wallet.dto';
import { CurrentUser } from '../../decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../types/general';
import { SetPinDto } from './dto/set-pin.dto';
import { UpdatePinDto } from './dto/update-pin.dto';
import { ResolveAccountNumberDto } from './dto/resolve-account-number.dto';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('bank-list')
  getBankList() {
    return this.walletService.getBankList();
  }

  @Get('account-number/resolve')
  resolveAccountNumber(
    @Query() resolveAccountNumberDto: ResolveAccountNumberDto,
  ) {
    return this.walletService.resolveAccountNumber(resolveAccountNumberDto);
  }

  @Roles(Role.ADMIN)
  @Get(':walletId')
  findOne(@Param('walletId') walletId: string) {
    return this.walletService.getByWalletId(walletId);
  }

  @Get(':walletId/balance')
  getBalance(@Param('walletId') walletId: string, @CurrentUser() user: User) {
    return this.walletService.geWalletBalance(walletId, user);
  }

  @Post(':walletId/withdraw')
  withdraw(
    @Body() withdrawFromWalletDto: WithdrawFromWalletDto,
    @CurrentUser() user: User,
  ) {
    return this.walletService.withdrawFromWallet(withdrawFromWalletDto, user);
  }

  @Put(':walletId/set-pin')
  setPin(@Body() setPinDto: SetPinDto, @CurrentUser() user: User) {
    return this.walletService.setWalletPin(user, setPinDto);
  }

  @Put(':walletId/update-pin')
  updatePin(@Body() updatePinDto: UpdatePinDto, @CurrentUser() user: User) {
    return this.walletService.updateWalletPin(user, updatePinDto);
  }
}
