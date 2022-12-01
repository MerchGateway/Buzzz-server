import { Controller, Get, Param } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { AnalyticsService, OrderT } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('orders')
  orders(@CurrentUser() user: User): Promise<OrderT> {
    return this.analyticsService.orders(user);
  }

  @Get('revenue')
  revenue(@CurrentUser() user: User) {
    return this.analyticsService.revenue(user);
  }

  @Get('customer')
  customer(@CurrentUser() user: User) {
    return this.analyticsService.customer(user);
  }
}
