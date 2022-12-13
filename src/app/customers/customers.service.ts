import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

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

    private readonly userRepository: UsersService,
  ) {}
  async create(sellerId: any, userId: string): Promise<Customer | []> {
    await this.userRepository.findOne(sellerId);

    const res = await this.customerRepository
      .createQueryBuilder('findCustomer')
      .where('sellerId = :sellerId', { sellerId })
      .andWhere('customerId = :customerId', { customerId: userId })
      .getOne();

    if (!res) {
      const customer = new Customer();
      customer.customerId = userId;
      customer.sellerId = sellerId;
      return await this.customerRepository.save(customer);
    }

    return res;
  }

  async findAll(userId: string): Promise<Customer[] | []> {
    const res = await this.customerRepository
      .createQueryBuilder('allSellersCustomers')
      .where('sellerId = :sellerId', { sellerId: userId })
      .orderBy('allSellersCustomers.createdAt', 'DESC')
      .getMany();

    return res;
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
