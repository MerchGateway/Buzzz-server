import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrintingPartner } from './entities/printing-partner.entity';
import { User } from 'src/app/users/entities/user.entity';
import { HttpException } from '@nestjs/common';
import { Status } from 'src/types/order';
import { OrderService } from 'src/app/order/order.service';
import { Order } from 'src/app/order/entities/order.entity';

@Injectable()
export class PrintingPartnerService {
  constructor(
    @InjectRepository(PrintingPartner)
    private readonly printingPartnerRepository: Repository<PrintingPartner>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly orderService: OrderService,
  ) {}

  async getOrders(user: User) {
    try {
      const orders = await this.printingPartnerRepository.findOneBy({
        id: user.printing_partner.id,
      });

      return orders.orders;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  async viewOrder(user: User, id: string) {
    try {
      const order = await this.orderRepository.findOneBy({
        id,
        printing_partner: { id: user.printing_partner.id },
      });

      if (!order) {
        return new NotFoundException(
          ` order with id ${id} does  not  exist or isnt asigned to you`,
        );
      }
      return order;
    } catch (err) {
      user;
      throw new HttpException(err.message, err.status);
    }
  }

  async viewPackagingContent(user: User) {
    try {
      return 'returns the packaging contents associated with printing partner ';
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async viewDesign(user: User, id: string) {
    try {
      return 'returns a  single design ';
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async updateStatus(user: User, body: { status: Status }, id: string) {
    try {
      const allowedStatuses = ['In-progress', 'Printed'];

      if (!allowedStatuses.includes(body.status)) {
        return new UnauthorizedException(
          'Printing partner  only allowed  to set status  to "In-progress" or "Printed" ',
        );
      }

      const order = await this.orderService.getOrder(id);
      if (
        typeof order.printing_partner === 'undefined' ||
        !order.printing_partner
      ) {
        return new UnauthorizedException(
          'This order hasnt been assigned to you',
        );
      }

      if (order.printing_partner !== user.printing_partner) {
        return new UnauthorizedException(
          'This order hasnt been assigned to you',
        );
      }

      return await this.orderRepository.update(id, { status: body.status });
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async downloadDesign(user: User, id: string) {
    try {
      return 'downloads  a design  ';
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
