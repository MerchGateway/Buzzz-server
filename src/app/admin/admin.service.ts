import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
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
    try {
      const printingPartner = this.printingPartnerRepository.create(data);

      return await this.printingPartnerRepository.save(printingPartner);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  async createLogisticPartner(data: CreateLogisticsPartnerDto) {
    try {
      const logisticsPartner = this.logisticsPartnerRepository.create(data);

      return await this.logisticsPartnerRepository.save(logisticsPartner);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  async editPrintingPartner(data: UpdatePrintingPartnerDto, id: string) {
    try {
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
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  async editLogisticsPartner(data: UpdateLogisticsPartnerDto, id: string) {
    try {
      const isLogisticsPartner =
        await this.logisticsPartnerRepository.findOneBy({
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
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async getAllPrintingPartners() {
    try {
      return await this.printingPartnerRepository.find({
        relations: ['administrators'],
      });
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  async getAllLogisticsPartners() {
    try {
      return await this.logisticsPartnerRepository.find({
        relations: ['administrators'],
      });
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  async getSinglePrintingPartner(id: string) {
    try {
      const printingPartner = await this.printingPartnerRepository.findOne({
        where: {
          id,
        },
        relations: ['administrators'],
      });
      if (!printingPartner) {
        throw new NotFoundException(
          `printing partner with id ${id} does  not exist`,
        );
      }

      return printingPartner;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  async getSingleLogisticsPartner(id: string) {
    try {
      const logisticsPartner = await this.logisticsPartnerRepository.findOne({
        where: {
          id,
        },
        relations: ['administrators'],
      });
      if (!logisticsPartner) {
        throw new NotFoundException(
          `logistics partner with id ${id} does  not exist`,
        );
      }

      return logisticsPartner;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  async togglePrintingPartnerStatus(id: string, data: { status: Status }) {
    try {
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
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  async toggleLogisticsPartnerStatus(id: string, data: { status: Status }) {
    try {
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
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async editPrintingAdmin(data: UpdatePrintingAdminDto, id: string) {
    try {
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
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async editLogisticsAdmin(data: UpdateLogisticsAdminDto, id: string) {
    try {
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
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async deletePrintingPartner(id: string) {
    try {
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
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async deleteLogisticsPartner(id: string) {
    try {
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
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async createLogisticsAdmin(data: CreateLogisticsAdminDto, id: string) {
    try {
      // find logistics
      const isLogisticsPartner = await this.getSingleLogisticsPartner(id);

      const logisticsAdmin = this.userRepository.create({
        email: data.email,
        role: Role.LOGISTIC_ADMIN,
        password: data.password,
        logisticsPartner: isLogisticsPartner,
      });

      return await this.userRepository.save(logisticsAdmin);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async createPrintingAdmin(data: CreatePrintingAdminDto, id: string) {
    try {
      // find logistics
      const isPrintingPartner = await this.getSinglePrintingPartner(id);

      console.log(isPrintingPartner);
      const printingsAdmin = this.userRepository.create({
        email: data.email,
        role: Role.PRINTING_ADMIN,
        password: data.password,
        printingPartner: isPrintingPartner,
      });

      return await this.userRepository.save(printingsAdmin);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async viewAllPrintingAdmins() {
    try {
      return await this.userRepository.find({
        where: { role: Role.PRINTING_ADMIN },
        relations: ['printing_partner'],
      });
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async viewAllLogisticsAdmins() {
    try {
      return await this.userRepository.find({
        where: { role: Role.LOGISTIC_ADMIN },
        relations: ['logistics_partner'],
      });
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  async viewAllOrdersAssignedToLogisticsPartner(id: string) {
    try {
      const logisticsPartner = await this.logisticsPartnerRepository.findOneBy({
        id,
      });

      if (!logisticsPartner) {
        throw new NotFoundException(
          `logistics partner with id ${id} does  not exist`,
        );
      }

      return logisticsPartner.orders;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  async viewAllOrdersAssignedToPrintingPartner(id: string) {
    try {
      const printingPartner = await this.printingPartnerRepository.findOneBy({
        id,
      });

      if (!printingPartner) {
        throw new NotFoundException(
          `printing partner with id ${id} does  not exist`,
        );
      }

      return printingPartner.orders;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async AssignOrdersToPrintingPartner(data: {
    orders: string[];
    printingPartner: string;
  }) {
    try {
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
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async AssignOrdersToLogisticsPartner(data: {
    orders: string[];
    logisticsPartner: string;
  }) {
    try {
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
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
