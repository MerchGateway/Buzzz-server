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
import { TwoFactorAuth } from './entities/twoFactorAuth.entity';
import { TwoFaLocalAuthGuard } from './guard/twoFa-local-auth-guard';
import { twoFactorAuthService } from './twoFactorAuth.service';

@Controller('2fa')
export class TwoFactorAuthController {
  constructor(private readonly twoFactorAuthService: twoFactorAuthService) {}

  @Post('toggle-2fa')
  @HttpCode(200)
  toogleTwoFa(@Body() payload: Toggle2faDto, @CurrentUser() user: User) {
    return this.twoFactorAuthService.toggle2fa(payload, user);
  }

  @Public()
  @Get('generate-2fa-code')
  generate2faCode(@Res() stream: Response, @CurrentUser() user: User) {
    return this.twoFactorAuthService.initialize2fa(user, stream);
  }

  @UseGuards(TwoFaLocalAuthGuard)
  @Post('signin')
  signinWith2fa(@CurrentUser() user: User) {
    return this.twoFactorAuthService.signinWith2fa(user);
  }
}
