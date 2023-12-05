import {
  Controller,
  Post,
  Body,
  Delete,
  UseGuards,
  Get,
  Put,
  Param,
  Query,
} from '@nestjs/common';
import {
  PublishDesignDto,
  PublishDesignAndCheckoutDto,
  PublishAndGiftDto,
} from './dto/design.dto';
import { PolymailerContent } from '../order/entities/polymailer-content.entity';
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
  fetchPolyMailerContents(): Promise<PolymailerContent[] | undefined> {
    return this.designService.fetchPolymailerContents();
  }

  @Roles(Role.SUPER_ADMIN, Role.PRINTING_ADMIN)
  @UseGuards(RolesGuard)
  @Post('create-polymailer-content')
  createPolyMailerContent(
    @Body() payload: { content: string }[],
  ): Promise<PolymailerContent[] | undefined> {
    return this.designService.createPolymailerContent(payload);
  }

  @Get('use-template')
  useTemplate(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ): Promise<Design | undefined> {
    return this.designService.useTemplate(id, user);
  }

  @Public()
  @Get('templates')
  fetchTemplates() {
    return this.designService.fetchTemplates();
  }

  @Get('all')
  viewAllDesigns(@CurrentUser() user: User) {
    return this.designService.viewAllDesigns(user);
  }

  @Get('')
  fetchLatestDesignForUser(@CurrentUser() user: User) {
    return this.designService.fetchLatestDesignForCurrentUser(user);
  }

  @Public()
  @Get('view-design/:id')
  fetchSingleDesign(@Param('id', ParseUUIDPipe) id: string) {
    return this.designService.fetchSingleDesign(id);
  }

  @Roles(Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @Delete('single-design/:id')
  deleteSingleDesign(@Param('id', ParseUUIDPipe) id: string) {
    return this.designService.deleteSingleDesign(id);
  }

  @Delete(':id')
  deleteDesign(
    @CurrentUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.designService.deleteDesignForCurrentUser(user, id);
  }

  @Put('add-contributors/:id')
  addContributors(
    @CurrentUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: { emails: string[] },
  ) {
    return this.designService.addContributorsToDesign(
      { emails: payload.emails, id },
      user,
    );
  }
  @Put('remove-contributors/:id')
  removeContributors(
    @CurrentUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: { emails: string[] },
  ) {
    return this.designService.removeContributorsToDesign(
      { emails: payload.emails, id },
      user,
    );
  }

  @Post('publish-design/:id')
  publishDesign(
    @Body() payload: PublishDesignDto,
    @CurrentUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Query('category-id', ParseUUIDPipe) category_id: string,
  ) {
    return this.designService.publishDesign(user, payload, id, category_id);
  }
  @Post('publish-design-and-gift/:id')
  publishDesignAndGift(
    @Body() payload: PublishAndGiftDto,
    @CurrentUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Query('category-id', ParseUUIDPipe) category_id: string,
  ) {
    return this.designService.publishAndGift(user, payload, id, category_id);
  }

  @Get('fetch-my-design/:id')
  fetchMyDesign(
    @CurrentUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.designService.fetchMyDesign(id, user);
  }

  @Post('publish-design-and-checkout/:id')
  publishDesignAndCheckout(
    @Body() payload: PublishDesignAndCheckoutDto,
    @CurrentUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Query('category-id', ParseUUIDPipe) category_id: string,
  ) {
    return this.designService.publishDesignAndCheckout(
      user,
      payload,
      id,
      category_id,
    );
  }

  @Post(':id/attach-to-user')
  attachDesignToUser(
    @CurrentUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.designService.attachDesignToUser(user, id);
  }
}
