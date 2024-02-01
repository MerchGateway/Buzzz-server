import { Controller, Post, UseGuards, Get, Body } from '@nestjs/common';
import { CreateWaitlistDto } from './dto/create-waitlist.dto';
import { Role } from 'src/types/general';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Public } from 'src/decorators/public.decorator';
import { WaitlistService } from './waitlist.service';

@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  @Public()
  @Post('')
  createWaitlist(@Body() data: CreateWaitlistDto) {
    return this.waitlistService.createwaitlist(data);
  }
  //   @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  //   @UseGuards(RolesGuard)
  //   @Post('send-new-product-update')
  //   sendNewProductUpdatesToWaitlist() {
  //     return this.waitlistService.sendNewProductUpdatesToWaitlist();
  //   }

  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get('')
  fetchWaitlist() {
    return this.waitlistService.fetchwaitlist();
  }
}
