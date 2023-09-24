import { Type } from 'class-transformer';
import { Wallet } from '../../wallet/entities/wallet.entity';
import { IsEnum, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import {
  TransactionMethod,
  TransactionStatus,
  TransactionType,
} from '../entities/wallet-transaction.entity';

export class CreateWalletTransactionDto {
  @Type(() => Wallet)
  @ValidateNested()
  wallet: Wallet;

  @IsEnum(TransactionType)
  @IsOptional()
  type: TransactionType;

  @IsEnum(TransactionMethod)
  method: TransactionMethod;

  @IsEnum(TransactionStatus)
  @IsOptional()
  status: TransactionStatus;

  @IsOptional()
  reference: string;

  @IsNumber()
  amount: number;
}
