import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { CreateGiftDto } from './dto/create-gift.dto';
import { GiftService } from './gift.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { CreateOrderDto } from '../order/dto/order.dto';

@Controller('gifts')
export class GiftController {
  constructor(private readonly giftService: GiftService) {}

  @Post('')
  createGift(@Body() data: CreateGiftDto, @CurrentUser() user: User) {
    return this.giftService.createGift(data, user);
  }

  @Get('')
  fetchGiftByCurrentUser(@CurrentUser() user: User) {
    return this.giftService.fetchGiftsByCurrentUser(user);
  }
  @Get('my-gifts')
  fetchGiftForCurrentUser(@CurrentUser() user: User) {
    return this.giftService.fetchGiftsForCurrentUser(user);
  }

  @Get('/:giftCode')
  fetchSingleGift(@Param('giftCode') giftCode: string) {
    return this.giftService.fetchSingleGift({ giftCode });
  }

  @Post('claim/:giftCode')
  claimGift(
    @Param('giftCode') giftCode: string,
    @CurrentUser() user: User,
    payload: CreateOrderDto,
  ) {
    return this.giftService.claimGift(giftCode, user, payload);
  }
  @Get('benefactors/:giftCode')
  fetchGiftBenefactors(
    @CurrentUser() user: User,
    @Param('giftCode') giftCode: string,
  ) {
    return this.giftService.fetchGiftBenefactors(giftCode, user);
  }
}
