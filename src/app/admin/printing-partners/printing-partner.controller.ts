import {
  Controller,
  Body,
  Get,
  Patch,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import { Role } from 'src/types/general';
import { Roles } from 'src/decorators/roles.decorator';
import { PrintingPartnerService } from './printing-partner.service';
import { CurrentUser } from '../../../decorators/user.decorator';
import { User } from 'src/app/users/entities/user.entity';
import { Status } from 'src/types/order';
@Controller('admin/printing-partner')
export class PrintingPartnerController {
  constructor(private readonly printingService: PrintingPartnerService) {}

  @Roles(Role.PRINTING_ADMIN)
  @Get('/get-orders')
  getOrders(@CurrentUser() user: User) {
    return this.printingService.getOrders(user);
  }
  @Roles(Role.PRINTING_ADMIN)
  @Get('/view-packaging-content/:id')
  viewPackagingContent(
    @CurrentUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.printingService.viewPackagingContent(user, id);
  }

  @Roles(Role.PRINTING_ADMIN)
  @Get('/view-design/:id')
  viewDesign(
    @CurrentUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.printingService.viewDesign(user, id);
  }

  @Roles(Role.PRINTING_ADMIN)
  @Patch('/update-status/:id')
  updateStatus(
    @Body() body: { status: Status },
    @CurrentUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.printingService.updateStatus(user, body, id);
  }
  @Roles(Role.PRINTING_ADMIN)
  @Get('/download-design/:id')
  downloadDesign(@CurrentUser() user: User, @Param('id') id: string) {
    return this.printingService.downloadDesign(user, id);
  }
  @Roles(Role.PRINTING_ADMIN)
  @Get('/view-order/:id')
  viewOrder(@CurrentUser() user: User, @Param('id') id: string) {
    return this.printingService.viewOrder(user, id);
  }
}
