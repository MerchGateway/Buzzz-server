import { Injectable } from '@nestjs/common';
import { CustomersService } from '../customers/customers.service';
// import { Order } from '../order/entities/order.entity';
import { OrderService } from '../order/order.service';
import { TransactionService } from '../transaction/transaction.service';
import { User } from '../users/entities/user.entity';

export interface OrderT {
  monthOrder: number;
  margin: number;
  position: string;
}

export interface CustomerT {
  allTimeCustomer: number;
  margin: number;
  position: string;
}

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly orderService: OrderService,
    private readonly customerService: CustomersService,
  ) {}

  async orders(user: User): Promise<OrderT> {
    const data = await this.orderService.orderAnalytics(user.id);

    //if the present month's iorders are greater
    if (data.thisMonthOrder > data.lastTwoMonthsOrder) {
      const margin = data.thisMonthOrder - data.lastTwoMonthsOrder;
      //if it is positive
      const percentageIncrease = (margin / data.lastTwoMonthsOrder) * 100;

      return {
        monthOrder: data.thisMonthOrder,
        margin: percentageIncrease,
        position: 'increase',
      };
    }
    //if the present month's order is lower
    else if (data.thisMonthOrder < data.lastTwoMonthsOrder) {
      const margin = data.lastTwoMonthsOrder - data.thisMonthOrder;
      const percentageDecrease = (margin / data.lastTwoMonthsOrder) * 100;
      return {
        monthOrder: data.thisMonthOrder,
        margin: percentageDecrease,
        position: 'decrease',
      };
    } else {
      return { monthOrder: data.thisMonthOrder, margin: 0, position: 'same' };
    }
  }

  async revenue(user: User) {
    return await this.orderService.revenueAnalytics(user.id);
  }

  async customer(user: User): Promise<CustomerT> {
    const data = await this.customerService.customerAnalytics(user);
    //if the present month's iorders are greater
    if (data.thisMonthCustomers > data.lastTwoMonthsCustomers) {
      const margin = data.thisMonthCustomers - data.lastTwoMonthsCustomers;
      //if it is positive
      const percentageIncrease = (margin / data.lastTwoMonthsCustomers) * 100;

      return {
        allTimeCustomer: data.allCustomers,
        margin: percentageIncrease,
        position: 'increase',
      };
    }
    //if the present month's order is lower
    else if (data.thisMonthCustomers < data.lastTwoMonthsCustomers) {
      const margin = data.lastTwoMonthsCustomers - data.thisMonthCustomers;
      const percentageDecrease = (margin / data.lastTwoMonthsCustomers) * 100;
      return {
        allTimeCustomer: data.allCustomers,
        margin: percentageDecrease,
        position: 'decrease',
      };
    } else {
      return {
        allTimeCustomer: data.allCustomers,
        margin: 0,
        position: 'same',
      };
    }
  }
}
