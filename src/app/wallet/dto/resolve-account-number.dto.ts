import { IsNumberString } from 'class-validator';

export class ResolveAccountNumberDto {
  @IsNumberString()
  accountNumber: string;

  @IsNumberString()
  bankCode: string;
}
