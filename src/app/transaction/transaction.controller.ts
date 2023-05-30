import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';

import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/types/general';

import { RolesGuard } from '../auth/guards/roles.guard';
// import { CreateTransactionDto } from './dto/transaction.dto';
import { User } from '../users/entities/user.entity';

import { CurrentUser } from 'src/decorators/user.decorator';
import { Public } from 'src/decorators/public.decorator';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Public()
  @Get('verify/')
  @HttpCode(HttpStatus.CREATED)
  private verifyTransaction(
    @Query('reference') reference: string,
  ): Promise<Transaction | undefined> {
    return this.transactionService.verifyTransaction(reference);
  }

  
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @Get('')
  private getTransactions(
    @CurrentUser() user: User,
  ): Promise<Transaction[] | undefined> {
    return this.transactionService.getTransactionsForAuthUser(user);
  }

  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':reference')
  private deleteTransaction(
    @Param('reference') reference: string,
  ): Promise<Transaction | undefined> {
    return this.transactionService.deleteTransaction(reference);
  }

  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @Get('/sales-analytics')
  private salesAnalytics(
    @Query('query') query: string,
  ): Promise<Transaction[] | undefined> {
    return this.transactionService.salesAnalytics(query);
  }
}
