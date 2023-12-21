import {
  BadRequestException,
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogisticsPartner } from './logistics-partners/entities/logistics-partner.entity';
import { PrintingPartner } from './printing-partners/entities/printing-partner.entity';
import { Status as OrderStatus } from 'src/types/order';
import {
  CreateLogisticsPartnerDto,
  UpdateLogisticsPartnerDto,
  UpdateLogisticsAdminDto,
  CreateLogisticsAdminDto,
} from './logistics-partners/dto/logisitics-partner.dto';
import {
  CreatePrintingPartnerDto,
  UpdatePrintingPartnerDto,
  UpdatePrintingAdminDto,
  CreatePrintingAdminDto,
} from './printing-partners/dto/printing-partner.dto';
import { User } from '../users/entities/user.entity';
import { Status } from '../../types/status';
import { SuccessResponse } from 'src/utils/response';
import { Role } from 'src/types/general';
import { Order } from '../order/entities/order.entity';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(PrintingPartner)
    private readonly printingPartnerRepository: Repository<PrintingPartner>,
    @InjectRepository(LogisticsPartner)
    private readonly logisticsPartnerRepository: Repository<LogisticsPartner>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createPrintingPartner(data: CreatePrintingPartnerDto) {
    const printingPartner = this.printingPartnerRepository.create(data);
    return await this.printingPartnerRepository.save(printingPartner);
  }
  async createLogisticPartner(data: CreateLogisticsPartnerDto) {
    const logisticsPartner = this.logisticsPartnerRepository.create(data);
    return await this.logisticsPartnerRepository.save(logisticsPartner);
  }
  async editPrintingPartner(data: UpdatePrintingPartnerDto, id: string) {
    const isPrintingPartner = await this.printingPartnerRepository.findOneBy({
      id,
    });

    if (!isPrintingPartner) {
      throw new NotFoundException(
        `printing partner with id ${id} does  not exist`,
      );
    }

    return await this.printingPartnerRepository.save({
      ...isPrintingPartner,
      ...data,
    });
  }
  async editLogisticsPartner(data: UpdateLogisticsPartnerDto, id: string) {
    const isLogisticsPartner = await this.logisticsPartnerRepository.findOneBy({
      id,
    });

    if (!isLogisticsPartner) {
      throw new NotFoundException(
        `logistics partner with id ${id} does  not exist`,
      );
    }

    return await this.logisticsPartnerRepository.save({
      ...isLogisticsPartner,
      ...data,
    });
  }

  async getAllPrintingPartners() {
    return await this.printingPartnerRepository.find({
      select: ['address', 'status', 'createdAt', 'id', 'name'],
    });
  }
  async getAllLogisticsPartners() {
    return await this.logisticsPartnerRepository.find({
      select: ['address', 'status', 'createdAt', 'id', 'name'],
    });
  }
  async getSinglePrintingPartner(id: string) {
    const printingPartner = await this.printingPartnerRepository.findOne({
      where: {
        id,
      },
      select: ['address', 'status', 'createdAt', 'id', 'name'],
    });
    if (!printingPartner) {
      throw new NotFoundException(
        `printing partner with id ${id} does  not exist`,
      );
    }

    return printingPartner;
  }
  async getSingleLogisticsPartner(id: string) {
    const logisticsPartner = await this.logisticsPartnerRepository.findOne({
      where: {
        id,
      },
      select: ['address', 'status', 'createdAt', 'id', 'name'],
    });
    if (!logisticsPartner) {
      throw new NotFoundException(
        `logistics partner with id ${id} does  not exist`,
      );
    }

    return logisticsPartner;
  }
  async togglePrintingPartnerStatus(id: string, data: { status: Status }) {
    const printingPartner = await this.printingPartnerRepository.findOneBy({
      id,
    });
    if (!printingPartner) {
      throw new NotFoundException(
        `printing partner with id ${id} does  not exist`,
      );
    }
    return await this.printingPartnerRepository.save({
      ...printingPartner,
      status: data.status,
    });
  }
  async toggleLogisticsPartnerStatus(id: string, data: { status: Status }) {
    const logisticsPartner = await this.logisticsPartnerRepository.findOneBy({
      id,
    });
    if (!logisticsPartner) {
      throw new NotFoundException(
        `logistics partner with id ${id} does  not exist`,
      );
    }
    return await this.logisticsPartnerRepository.save({
      ...logisticsPartner,
      status: data.status,
    });
  }

  async editPrintingAdmin(data: UpdatePrintingAdminDto, id: string) {
    const printingAdmin = await this.userRepository.findOneBy({
      id,
      role: Role.PRINTING_ADMIN,
    });
    if (!printingAdmin) {
      throw new NotFoundException(
        `printing admin with id ${id} does  not exist`,
      );
    }
    return await this.userRepository.update(id, data);
  }

  async editLogisticsAdmin(data: UpdateLogisticsAdminDto, id: string) {
    const logisticsAdmin = await this.userRepository.findOneBy({
      id,
      role: Role.LOGISTIC_ADMIN,
    });
    if (!logisticsAdmin) {
      throw new NotFoundException(
        `logistics admin with id ${id} does  not exist`,
      );
    }
    return await this.userRepository.update(id, data);
  }

  async deletePrintingPartner(id: string) {
    const printingPartner = await this.printingPartnerRepository.findOneBy({
      id,
    });
    if (!printingPartner) {
      throw new NotFoundException(
        `printing partner with id ${id} does  not exist`,
      );
    }

    await this.userRepository.delete(id);
    return new SuccessResponse(
      {},
      `printing partner with id ${id} deleted successfully`,
    );
  }

  async deleteLogisticsPartner(id: string) {
    const logisticsPartner = await this.logisticsPartnerRepository.findOneBy({
      id,
    });
    if (!logisticsPartner) {
      throw new NotFoundException(
        `logistics partner with id ${id} does  not exist`,
      );
    }

    await this.userRepository.delete(id);
    return new SuccessResponse(
      {},
      `logistics partner with id ${id} deleted successfully`,
    );
  }

  async createLogisticsAdmin(data: CreateLogisticsAdminDto, id: string) {
    // find logistics
    const isLogisticsPartner = await this.getSingleLogisticsPartner(id);

    const logisticsAdmin = this.userRepository.create({
      email: data.email,
      firstName: 'Merch',
      lastName: 'Printer',
      role: Role.LOGISTIC_ADMIN,
      password: data.password,
      logisticsPartner: isLogisticsPartner,
    });

    return await this.userRepository.save(logisticsAdmin);
  }

  async createPrintingAdmin(data: CreatePrintingAdminDto, id: string) {
    // find logistics
    const isPrintingPartner = await this.getSinglePrintingPartner(id);

    console.log(isPrintingPartner);
    const printingsAdmin = this.userRepository.create({
      email: data.email,
      firstName: 'Merch',
      lastName: 'Delieverer',
      role: Role.PRINTING_ADMIN,
      password: data.password,
      printingPartner: isPrintingPartner,
    });

    return await this.userRepository.save(printingsAdmin);
  }

  async viewAllPrintingAdmins() {
    return await this.userRepository.find({
      where: { role: Role.PRINTING_ADMIN },
      relations: ['printing_partner'],
      select: [
        'address',
        'email',
        'createdAt',
        'id',
        'lastName',
        'firstName',
        'role',
        'printingPartner',
      ],
    });
  }
  private async getNearestPartnerToOrder(
    order: Order,
    partnerType: 'Printing' | 'Logistics',
  ) {
    const partner =
      partnerType === 'Logistics'
        ? this.logisticsPartnerRepository
        : this.printingPartnerRepository;
    const closestPartner = await partner
      .createQueryBuilder(partnerType)
      .orderBy(
        `ST_DISTANCE(
           POINT(${order.shippingDetails.shippingAddress.latitude},
             ${order.shippingDetails.shippingAddress.latitude}),
           POINT(partner.address.latitude, partner.address.longitude)
        )`,
      )
      .getOne();
    return closestPartner || null;
  }
  async assignOrdersAutoToClosestPartner(
    partnerType: 'Printing' | 'Logistics',
    order: Order,
  ) {
    if (order.shippingDetails) {
      throw new PreconditionFailedException(
        'Cannot assign order without an address field',
      );
    }

    const nearestPartner = await this.getNearestPartnerToOrder(
      order,
      partnerType,
    );
    partnerType === 'Logistics'
      ? await this.AssignOrdersToLogisticsPartner({
          orders: [order.id],
          logisticsPartner: nearestPartner.id,
        })
      : await this.AssignOrdersToPrintingPartner({
          orders: [order.id],
          printingPartner: nearestPartner.id,
        });
    return order;
  }

  async viewAllLogisticsAdmins() {
    return await this.userRepository.find({
      where: { role: Role.LOGISTIC_ADMIN },
      relations: ['logistics_partner'],
      select: [
        'address',
        'email',
        'createdAt',
        'id',
        'lastName',
        'firstName',
        'role',
        'logisticsPartner',
      ],
    });
  }
  async viewAllOrdersAssignedToLogisticsPartner(id: string) {
    const logisticsPartner = await this.logisticsPartnerRepository.findOneBy({
      id,
    });

    if (!logisticsPartner) {
      throw new NotFoundException(
        `logistics partner with id ${id} does  not exist`,
      );
    }

    return logisticsPartner.orders;
  }
  async viewAllOrdersAssignedToPrintingPartner(id: string) {
    const printingPartner = await this.printingPartnerRepository.findOneBy({
      id,
    });

    if (!printingPartner) {
      throw new NotFoundException(
        `printing partner with id ${id} does  not exist`,
      );
    }

    return printingPartner.orders;
  }

  async AssignOrdersToPrintingPartner(data: {
    orders: string[];
    printingPartner: string;
  }) {
    const printingPartner = await this.printingPartnerRepository.findOneBy({
      id: data.printingPartner,
      status: Status.ENABLED,
    });

    if (!printingPartner) {
      throw new NotFoundException(
        `printing  partner with id ${data.printingPartner} does  not exist or  disabled`,
      );
    }

    const orders: Order[] = await Promise.all(
      data.orders.map(async (id) => {
        const isOrderPaid = await this.orderRepository.findOneBy({
          id,
          status: OrderStatus.PAID,
        });

        if (isOrderPaid) {
          isOrderPaid.printingPartner = printingPartner;
          return await this.orderRepository.save(isOrderPaid);
        }
      }),
    );

    if (!orders[0]) {
      throw new BadRequestException(
        'order(s) have not been paid for  or does not exist',
      );
    }

    return orders;
  }

  async AssignOrdersToLogisticsPartner(data: {
    orders: string[];
    logisticsPartner: string;
  }) {
    const logisticsPartner = await this.logisticsPartnerRepository.findOneBy({
      id: data.logisticsPartner,
      status: Status.ENABLED,
    });
    if (!logisticsPartner) {
      throw new NotFoundException(
        `logistics with id ${data.logisticsPartner} does  not exist or  disabled`,
      );
    }
    const orders: Order[] = await Promise.all(
      data.orders.map(async (id) => {
        const isOrderPrinted = await this.orderRepository.findOneBy({
          id,
          status: OrderStatus.PRINTED,
        });
        console.log(isOrderPrinted);
        if (isOrderPrinted) {
          isOrderPrinted.logisticsPartner = logisticsPartner;
          return await this.orderRepository.save(isOrderPrinted);
        }
      }),
    );

    if (!orders[0]) {
      throw new BadRequestException(
        'order(s)  have not been printed  or does not exist',
      );
    }

    return orders;
  }
}
