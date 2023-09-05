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
      // load user  with  printing  partner relationship
      const userWithPrintingRelation = await this.userRepository.findOne({
        where: { id: user.id },
        relations: ['printing_partner'],
      });

      // const partner = await this.printingPartnerRepository.findOneBy({
      //   id: userWithPrintingRelation.printing_partner.id,
      // });
      const orders = await this.orderRepository
        .createQueryBuilder('order')
        .leftJoin('order.printing_partner', 'printing_partner')
        .leftJoinAndSelect('order.product', 'product')
        .select('product.design')
        .select('product.thumbnail')
        .addSelect('quantity')
        .addSelect('polymailer_details')
        .addSelect('order.status', 'status')
        .where('printing_partner.id=:printing_partner', {
          printing_partner: userWithPrintingRelation.printing_partner.id,
        })
        .getRawMany();

      return orders;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  async viewOrder(user: User, id: string) {
    try {
      const userWithPartner = await this.userRepository.findOne({
        where: { id: user.id },
        relations: { printing_partner: true },
      });
      const order = await this.orderRepository.findOne({
        where: {
          id,
          printing_partner: { id: userWithPartner.printing_partner.id },
        },
        relations: { printing_partner: true },
      });

      if (!order) {
        throw new NotFoundException(
          ` order with id ${id} does  not  exist or isnt asigned to you`,
        );
      }
      return {
        design: order.product.design,
        thumbnail: order.product.thumbnail,
        quantity: order.quantity,
        status: order.status,
        polymailer_details: order.polymailer_details,
      };
    } catch (err) {
      user;
      throw new HttpException(err.message, err.status);
    }
  }

  async viewPackagingContent(user: User, id: string) {
    try {
      const order = await this.viewOrder(user, id);
      return { polymailer_details: order.polymailer_details };
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async viewDesign(user: User, id: string) {
    try {
      const order = await this.viewOrder(user, id);
      return { design: order.design };
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async updateStatus(user: User, body: { status: Status }, id: string) {
    try {
      const userWithPartner = await this.userRepository.findOne({
        where: { id: user.id },
        relations: { printing_partner: true },
      });
      const allowedStatuses = ['In-Progress', 'Printed'];

      if (!allowedStatuses.includes(body.status)) {
        throw new UnauthorizedException(
          'Printing partner  only allowed  to set status  to "In  Progress" or "Printed" ',
        );
      }

      const order = await this.orderRepository.findOne({
        where: { id },
        relations: ['printing_partner'],
      });
      console.log(order.printing_partner);

      if (
        !order.printing_partner ||
        order.printing_partner.id !== userWithPartner.printing_partner.id
      ) {
        throw new UnauthorizedException(
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
