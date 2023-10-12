import { IsNumber, IsNumberString } from 'class-validator';

export class WithdrawFromWalletDto {
  @IsNumber()
  amount: number;

  @IsNumberString()
  accountNumber: string;

  @IsNumberString()
  bankCode: string;

  @IsNumberString()
  pin: string;
}
