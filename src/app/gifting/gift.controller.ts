import {
  Controller,
  Post,
  Get,
  Param,
} from '@nestjs/common';
import { CreateGiftDto } from './dto/create-gift.dto';
import { Public } from 'src/decorators/public.decorator';
import { GiftService } from './gift.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('gifts')
export class GiftController {
  constructor(private readonly giftService: GiftService) {}

  @Public()
  @Post('')
  createGift(data: CreateGiftDto, @CurrentUser() user: User) {
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
    return this.giftService.fetchSingleGift(giftCode);
  }

  @Get('benefactors/:giftCode')
  fetchGiftBenefactors(
    @CurrentUser() user: User,
    @Param('giftCode') giftCode: string,
  ) {
    return this.giftService.fetchGiftBenefactors(giftCode, user);
  }
}
