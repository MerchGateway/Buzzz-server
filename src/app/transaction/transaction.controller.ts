import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Delete,
  UseGuards,
  Query,
  Post,
  Req,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { DefaultValuePipe } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/types/general';
import { RolesGuard } from '../auth/guards/roles.guard';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from 'src/decorators/user.decorator';
import { Public } from 'src/decorators/public.decorator';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly configService: ConfigService,
  ) {}

  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @Get('/all')
  private getAllTransactions(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Transaction>> {
    limit = limit > 100 ? 100 : limit < 10 ? 10 : limit;
    return this.transactionService.getTransactions({
      page,
      limit,
      route: `${this.configService.get<string>('appUrl')}/transaction/all`,
    });
  }

  @Get('')
  private getTransactions(
    @CurrentUser() user: User,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Transaction>> {
    limit = limit > 100 ? 100 : limit < 10 ? 10 : limit;
    return this.transactionService.getTransactionsForAuthUser(user, {
      page,
      limit,
      route: `${this.configService.get<string>('appUrl')}/transaction`,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('/webhook')
  private webhook(@Req() req: Request) {
    return this.transactionService.handleWebhook(req);
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
