import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { OrderService } from '../order/order.service';
import { Status } from 'src/types/status';
import { SuccessResponse } from 'src/utils/response';

interface customerAnalyticsT {
  allCustomers: number;
  thisMonthCustomers: number;
  lastTwoMonthsCustomers: number;
}

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly usersService: UsersService,
    private readonly orderRepository: OrderService,
  ) {}

  async create(sellerId: string, buyer: User) {
    await this.usersService.findOne(sellerId);

    let customer = await this.customerRepository.findOne({
      where: {
        seller: { id: sellerId },
        buyer: { id: buyer.id },
      },
    });

    if (!customer) {
      customer = this.customerRepository.create({
        seller: { id: sellerId },
        buyer: buyer,
      });
      customer = await this.customerRepository.save(customer);
    }

    return customer;
  }

  async findAll(userId: string): Promise<any> {
    const res = await this.customerRepository.find({
      where: {
        seller: { id: userId },
      },
      relations: {
        buyer: true,
      },
    });

    const sort = async (customer: Customer) => {
      const orders = await this.orderRepository.getOrders(customer.buyer);
      const data = {
        customer: customer,
        orders: orders,
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
        buyer: true,
      },
    });

    const sort = async (customer: Customer) => {
      const orders = await this.orderRepository.getOrders(customer.buyer);
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

  public async toggleStatus(Status: Status, sellerId: string): Promise<any> {
    const res = await this.customerRepository.findOne({
      where: {
        seller: { id: sellerId },
      },
      relations: {
        buyer: true,
      },
    });

    if (!res) {
      throw new NotFoundException(
        `customer with seller id ${sellerId} does not exist`,
      );
    }
    res.status = Status;
    return await this.customerRepository.save(res);
  }

  public async deleteCustomer(sellerId: string): Promise<any> {
    try {
      await this.customerRepository.delete({
        seller: { id: sellerId },
      });

      return new SuccessResponse(
        {},
        `customer with sellerId ${sellerId} deleted successfully`,
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
        .where('customers.seller_id = :sellerId', { sellerId: user.id })
        //get the total customers within the last month,
        .andWhere(
          `customers.created_at BETWEEN ${lastMonth} AND ${presentMonth}`,
        )
        .getCount();

      const lastTwoMonthsCustomers = await this.customerRepository
        .createQueryBuilder('customers')
        .where('customers.seller_id = :sellerId', { sellerId: user.id })
        // get the total customers within the last two months
        .andWhere(`customers.created_at BETWEEN ${twoMonths} AND ${lastMonth}`)
        .getCount();

      const allCustomers = await this.customerRepository
        .createQueryBuilder('customers')
        .where('customers.seller_id = :sellerId', { sellerId: user.id })
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
