import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrintingPartner } from './entities/printing-partner.entity';
import { User } from 'src/app/users/entities/user.entity';
import { Status } from 'src/types/order';
import { OrderService } from 'src/app/order/order.service';
import { Order } from 'src/app/order/entities/order.entity';
import { Role } from 'src/types/general';
import { AdminService } from '../admin.service';
import { SuccessResponse } from 'src/utils/response';
@Injectable()
export class PrintingPartnerService {
  constructor(
    @InjectRepository(PrintingPartner)
    private readonly printingPartnerRepository: Repository<PrintingPartner>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly adminService: AdminService,

    private readonly orderService: OrderService,
  ) {}

  async getOrders(user: User) {
    // load user  with  printing  partner relationship
    const userWithPrintingRelationship = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['printing_partner'],
    });

    // const partner = await this.printingPartnerRepository.findOneBy({
    //   id: userWithPrintingRelation.printing_partner.id,
    // });
    const orders = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoin('order.printing_partner', 'printing_partner')
      .leftJoin('order.product', 'product')
      .select('product.design')
      .select('product.thumbnail')
      .addSelect('quantity')
      .addSelect('polymailer_details')
      .addSelect('order.status', 'status')
      .where('printing_partner.id=:printing_partner', {
        printing_partner: userWithPrintingRelationship.printingPartner.id,
      })
      .getRawMany();

    return orders;
  }
  async viewOrder(user: User, id: string) {
    let order: Order;
    if (user.role === Role.SUPER_ADMIN) {
      order = await this.orderRepository.findOne({
        where: {
          id,
        },
        select: ['id', 'quantity', 'polymailerDetails', 'product', 'status'],
      });
    } else {
      const userWithPartner = await this.userRepository.findOne({
        where: { id: user.id },
        relations: { printingPartner: true },
      });
      order = await this.orderRepository.findOne({
        where: {
          id,
          printingPartner: { id: userWithPartner.printingPartner.id },
        },
        relations: { printingPartner: true },
        select: ['id', 'quantity', 'polymailerDetails', 'status'],
      });
    }

    if (!order) {
      throw new NotFoundException(
        ` order with id ${id} does  not  exist or isnt asigned to you`,
      );
    }
    return order;
  }

  async viewPackagingContent(user: User, id: string) {
    const order = await this.viewOrder(user, id);
    return { polymailer_details: order.polymailerDetails };
  }

  async viewDesign(user: User, id: string) {
    const order = await this.viewOrder(user, id);
    return { design: order.product.design };
  }

  async updateStatus(user: User, body: { status: Status }, id: string) {
    const userWithPartner = await this.userRepository.findOne({
      where: { id: user.id },
      relations: { printingPartner: true },
    });
    const allowedStatuses = ['In-Progress', 'Printed'];

    if (!allowedStatuses.includes(body.status)) {
      throw new UnauthorizedException(
        'Printing partner  only allowed  to set status  to "In-Progress" or "Printed" ',
      );
    }

    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['printing_partner'],
    });

    if (
      !order.printingPartner ||
      order.printingPartner.id !== userWithPartner.printingPartner.id
    ) {
      throw new UnauthorizedException('This order hasnt been assigned to you');
    }

    await this.orderRepository.update(id, { status: body.status });
    if (body.status === 'Printed') {
      await this.adminService.assignOrdersAutoToClosestPartner(
        'Logistics',
        order,
      );
    }
    return new SuccessResponse(order, `Order status set to ${body.status}`);
  }
}
