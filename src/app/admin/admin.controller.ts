import {
  Controller,
  Post,
  Body,
  Delete,
  Get,
  Patch,
  Put,
  Param,
} from '@nestjs/common';
import { Role } from 'src/types/general';
import { Roles } from 'src/decorators/roles.decorator';
import {
  CreateLogisticsPartnerDto,
  UpdateLogisticsAdminDto,
  UpdateLogisticsPartnerDto,
  CreateLogisticsAdminDto,
} from './logistics-partners/dto/logisitics-partner.dto';
import {
  CreatePrintingPartnerDto,
  UpdatePrintingPartnerDto,
  UpdatePrintingAdminDto,
  CreatePrintingAdminDto,
} from './printing-partners/dto/printing-partner.dto';
import { AdminService } from './admin.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { CreateCustomMailDto } from 'src/mail/dto/custom-mail.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService,
    private readonly mailService:MailService) {}

  @Roles(Role.SUPER_ADMIN)
  @Post('create-printing-partner')
  createPrintingPartner(@Body() data: CreatePrintingPartnerDto) {
    return this.adminService.createPrintingPartner(data);
  }

  @Roles(Role.SUPER_ADMIN)
  @Post('create-logistics-partner')
  createLogisticsPartner(@Body() data: CreateLogisticsPartnerDto) {
    return this.adminService.createLogisticPartner(data);
  }
  
  @Roles(Role.SUPER_ADMIN,Role.PUBLISHER)
  @Post('create-custom-message')
  createCustomMessage(@Body() data:CreateCustomMailDto) {
    return this.mailService.sendCustomMessage(data.receivers,data.subject,data.message);
  }

  @Roles(Role.SUPER_ADMIN)
  @Patch('edit-printing-partner/:id')
  editPrintingPartner(
    @Body() data: UpdatePrintingPartnerDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.adminService.editPrintingPartner(data, id);
  }

  @Roles(Role.SUPER_ADMIN)
  @Patch('edit-logistics-partner/:id')
  editLogisticsPartner(
    @Body() data: UpdateLogisticsPartnerDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.adminService.editLogisticsPartner(data, id);
  }

  @Roles(Role.SUPER_ADMIN)
  @Get('get-all-printing-partners')
  getPrintingPartners() {
    return this.adminService.getAllPrintingPartners();
  }

  @Roles(Role.SUPER_ADMIN)
  @Get('get-all-logistics-partners')
  getAllLogisticsPartners() {
    return this.adminService.getAllLogisticsPartners();
  }

  @Roles(Role.SUPER_ADMIN)
  @Get('get-logistics-partner/:id')
  getSingleLogisticsPartner(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminService.getSingleLogisticsPartner(id);
  }

  @Roles(Role.SUPER_ADMIN)
  @Get('get-printing-partner/:id')
  getSinglePrintingPartner(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminService.getSinglePrintingPartner(id);
  }

  // @Roles(Role.SUPER_ADMIN)
  // @Patch('toggle-printing-partner-status/:id')
  // togglePrintingPartnerStatus(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() data: UpdateLogisticsPartnerDto,
  // ) {
  //   return this.adminService.togglePrintingPartnerStatus(id, data);
  // }
  // @Roles(Role.SUPER_ADMIN)
  // @Patch('toggle-logistics-partner-status/:id')
  // toggleLogisticsPartnerStatus(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() data: UpdateLogisticsPartnerDto,
  // ) {
  //   return this.adminService.toggleLogisticsPartnerStatus(id, data);
  // }

  @Roles(Role.SUPER_ADMIN)
  @Put('edit-logistics-admin/:id')
  editLogisticsAdmin(
    @Param('id', ParseUUIDPipe) id: string,
    data: UpdateLogisticsAdminDto,
  ) {
    return this.adminService.editLogisticsAdmin(data, id);
  }

  @Roles(Role.SUPER_ADMIN)
  @Put('edit-printing-admin/:id')
  editPrintingAdmin(
    @Param('id', ParseUUIDPipe) id: string,
    data: UpdatePrintingAdminDto,
  ) {
    return this.adminService.editPrintingAdmin(data, id);
  }

  @Roles(Role.SUPER_ADMIN)
  @Delete('delete-printing-partner/:id')
  removePrintingPartner(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminService.deletePrintingPartner(id);
  }

  @Roles(Role.SUPER_ADMIN)
  @Delete('delete-logistics-partner/:id')
  removeLogisticsPartner(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminService.deleteLogisticsPartner(id);
  }

  @Roles(Role.SUPER_ADMIN)
  @Post('create-logistics-admin/:id')
  createLogisticsAdmin(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: CreateLogisticsAdminDto,
  ) {
    return this.adminService.createLogisticsAdmin(data, id);
  }

  @Roles(Role.SUPER_ADMIN)
  @Post('create-printing-admin/:id')
  createPrintingAdmin(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: CreatePrintingAdminDto,
  ) {
    return this.adminService.createPrintingAdmin(data, id);
  }

  @Roles(Role.SUPER_ADMIN)
  @Get('get-printing-admins')
  getPrintingAdmins() {
    return this.adminService.viewAllPrintingAdmins();
  }

  @Roles(Role.SUPER_ADMIN)
  @Get('get-logistics-admins')
  getLogisticsAdmins() {
    return this.adminService.viewAllLogisticsAdmins();
  }

  @Roles(Role.SUPER_ADMIN)
  @Get('order-assigned-to-printing-partner/:id')
  viewAllOrdersAssignedToPrintingPartner(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.adminService.viewAllOrdersAssignedToPrintingPartner(id);
  }

  @Roles(Role.SUPER_ADMIN)
  @Get('order-assigned-to-logistics-partner/:id')
  viewAllOrdersAssignedToLogisticsPartner(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.adminService.viewAllOrdersAssignedToLogisticsPartner(id);
  }

  @Roles(Role.SUPER_ADMIN)
  @Put('assign-orders-to-logistics-partner/:id')
  assignOrdersToLogisticsPartner(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: { orders: string[] },
  ) {
    return this.adminService.AssignOrdersToLogisticsPartner({
      ...data,
      logisticsPartner: id,
    });
  }

  @Roles(Role.SUPER_ADMIN)
  @Put('assign-orders-to-printing-partner/:id')
  assignOrdersPrintingPartner(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: { orders: string[] },
  ) {
    return this.adminService.AssignOrdersToPrintingPartner({
      ...data,
      printingPartner: id,
    });
  }
}
