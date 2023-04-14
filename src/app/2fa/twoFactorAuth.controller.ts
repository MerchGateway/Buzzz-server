import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  Get,
  Res,
} from '@nestjs/common';
import { Public } from '../../decorators/public.decorator';
import { CurrentUser } from '../../decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { Toggle2faDto } from './dto/toggle2fa.dto';
import { TwoFactorAuthService } from './twoFactorAuth.service';

@Controller('2fa')
export class TwoFactorAuthController {
  constructor(private readonly twoFactorAuthService: TwoFactorAuthService) {}

  @Post('toggle-2fa')
  @HttpCode(200)
  toogleTwoFa(@Body() payload: Toggle2faDto, @CurrentUser() user: User) {
    return this.twoFactorAuthService.toggle2fa(payload, user);
  }

  @Get('initialize-2fa')
  @HttpCode(200)
  initialize2fa( @CurrentUser() user: User) {
    return this.twoFactorAuthService.initialize2fa(user)
  }
}
