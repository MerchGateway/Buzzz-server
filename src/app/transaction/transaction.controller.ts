import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';

import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/transaction.dto';
import { User } from '../users/entities/user.entity';

import { CurrentUser } from 'src/decorators/user.decorator';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('initialize')
  @HttpCode(HttpStatus.CREATED)
  private createTransaction(
    @Body() payload: CreateTransactionDto,
    @CurrentUser() user: User,
  ): Promise<Transaction | undefined> {
    return this.transactionService.createTransaction(payload, user);
  }
  @Get('')
  private getTransactions(
    @CurrentUser() user: User,
  ): Promise<Transaction[] | undefined> {
    return this.transactionService.getTransactionsForAuthUser(user);
  }

  @Delete(':reference')
  private deleteTransaction(
    @Param('reference') reference: string,
  ): Promise<Transaction | undefined> {
    return this.transactionService.deleteTransaction(reference);
  }
}
