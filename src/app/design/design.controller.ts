import {
  Controller,
  Post,
  Body,
  Delete,
  UseGuards,
  HttpCode,
  Get,
  Patch,
  Put,
  HttpStatus,
  Param,
} from '@nestjs/common';
import {
  PublishDesignDto,
  PublishDesignAndCheckoutDto,
} from './dto/design.dto';
import { PolyMailerContent } from '../order/entities/polymailer_content.entity';
import { Design } from './entities/design.entity';
import { ParseUUIDPipe } from '@nestjs/common';
import { Role } from 'src/types/general';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from '../users/entities/user.entity';
import { DesignService } from './design.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { Public } from 'src/decorators/public.decorator';

@Controller('design')
export class DesignController {
  constructor(private readonly designService: DesignService) {}

  @Roles(Role.SUPER_ADMIN, Role.PRINTING_ADMIN)
  @UseGuards(RolesGuard)
  @Get('polymailer-contents')
  fetchPolyMailerContents(): Promise<PolyMailerContent[] | undefined> {
    console.log('passed  controller');
    return this.designService.fetchPolymailerContents();
  }

  @Roles(Role.SUPER_ADMIN, Role.PRINTING_ADMIN)
  @UseGuards(RolesGuard)
  @Post('create-polymailer-content')
  createPolyMailerContent(
    @Body('content') payload: string,
  ): Promise<PolyMailerContent | undefined> {
    return this.designService.createPolymailerContent(payload);
  }

  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @Get('all')
  viewAllDesigns() {
    return this.designService.viewAllDesigns();
  }

  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  @Get('')
  fetchLatestDesignForUser(@CurrentUser() user: User) {
    return this.designService.fetchLatestDesignForCurrentUser(user);
  }

  @Public()
  @Get('/:id')
  fetchSingleDesign(@Param('id', ParseUUIDPipe) id: string) {
    return this.designService.fetchSingleDesign(id);
  }

  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @Delete('single-design/:id')
  deleteSingleDesign(@Param('id', ParseUUIDPipe) id: string) {
    return this.designService.deleteSingleDesign(id);
  }

  @Post('publish-design')
  publishDesign(@Body() payload: PublishDesignDto, @CurrentUser() user: User) {
    return this.designService.publishRecentDesign(user, payload);
  }

  @Post('publish-design-and-checkout')
  publishDesignAndCheckout(
    @Body() payload: PublishDesignAndCheckoutDto,
    @CurrentUser() user: User,
  ) {
    return this.designService.publishRecentDesignAndCheckout(user, payload);
  }
}
