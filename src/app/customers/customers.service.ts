import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { OrderService } from '../order/order.service';
import { Order } from '../order/entities/order.entity';
import { Status } from 'src/types/status';
import { SuccessResponse } from 'src/utils/response';

interface customerAnalyticsT {
  allCustomers: number;
  thisMonthCustomers: number;
  lastTwoMonthsCustomers: number;
}

interface CustomerParams {
  customer: Customer | [];
  order: Order[] | [];
}

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,

    private readonly userRepository: UsersService,
    private readonly orderRepository: OrderService,
  ) {}
  async create(sellerId: any, user: User): Promise<Customer | []> {
    await this.userRepository.findOne(sellerId);

    const res = await this.customerRepository
      .createQueryBuilder('findCustomer')
      .where('sellerId = :sellerId', { sellerId })
      // .andWhere('customer = :customer', { customer: user })
      .getOne();
    // get order of customerId and add it to the rreturn value
    if (!res) {
      const customer = new Customer();
      customer.sellerId = sellerId;
      customer.customer = [user];
      return await this.customerRepository.save(customer);
    }

    return res;
  }

  async findAll(userId: string): Promise<any> {
    const res = await this.customerRepository.find({
      where: {
        sellerId: userId,
      },
      relations: {
        customer: true,
      },
    });

    const sort = async (customer: Customer) => {
      const orders = await this.orderRepository.getOrders(customer.customer[0]);
      const data = {
        customer: customer,
        order: orders,
      };
      return data;
    };

    const caller = async () => {
      return Promise.all(res?.map((h) => sort(h)));
    };

    return caller();
  }

  async findAllCustomersAvailable(): Promise<any> {
    const res = await this.customerRepository.find({
      relations: {
        customer: true,
      },
    });

    const sort = async (customer: Customer) => {
      const orders = await this.orderRepository.getOrders(customer.customer[0]);
      const data = {
        customer: customer,
        order: orders,
      };
      return data;
    };

    const caller = async () => {
      return Promise.all(res?.map((h) => sort(h)));
    };

    
    return caller();
  }

  public async toggleStatus(
    Status: Status,
    sellerId: string,
  ): Promise<any> {
    try {
      const res = await this.customerRepository.findOne({
        where: { sellerId },
        relations: {
          customer: true,
        },
      });

      if (!res) {
        throw new NotFoundException(
          `customer with seller id ${sellerId} does not exist`,
        );
      }
      res.status = Status;
      return await this.customerRepository.save(res);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async deleteCustomer(sellerId: string): Promise<any> {
    try {
      await this.customerRepository.delete({ sellerId });

      return new SuccessResponse(
        {},
        `customer with sellerId ${sellerId} deleted succesfully`,
        200,
      );
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async customerAnalytics(user: User): Promise<customerAnalyticsT> {
    try {
      const date = new Date();
      const day = date.getDate();
      const month: number = date.getMonth();
      const year = date.getFullYear();

      // month is indexed at 0
      const presentMonth = year + '-' + (month + 1) + '-' + day;
      const lastMonth = year + '-' + month + '-' + day;
      const twoMonths = year + '-' + (month - 1) + '-' + day;

      //Query the number of all customers with status paid
      const thisMonthCustomers = await this.customerRepository
        .createQueryBuilder('customers')
        .where('customers.sellerId = :sellerId', { sellerId: user.id })
        //get the total customers within the last month,
        .andWhere(
          `customers.created_at BETWEEN ${lastMonth} AND ${presentMonth}`,
        )
        .getCount();

      const lastTwoMonthsCustomers = await this.customerRepository
        .createQueryBuilder('customers_')
        .where('customers_.sellerId = :sellerId', { sellerId: user.id })
        // get the total customers within the last two months
        .andWhere(`customers_.created_at BETWEEN ${twoMonths} AND ${lastMonth}`)
        .getCount();

      const allCustomers = await this.customerRepository
        .createQueryBuilder('customers__')
        .where('customers__.sellerId = :sellerId', { sellerId: user.id })
        .getCount();

      // compare the numbers, and show the percentage increase or decrease

      return {
        allCustomers,
        thisMonthCustomers,
        lastTwoMonthsCustomers,
      };

      //compare
    } catch (err: any) {
      throw new HttpException(err.message, err.statusCode || 500);
    }
  }
}
