import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  Get,
  Patch,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { Public } from '../../decorators/public.decorator';
import { CurrentUser } from '../../decorators/user.decorator';
import { User } from 'src/app/users/entities/user.entity';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SignupUserDto } from './dto/signup-user.dto';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { TwitterOauthGuard } from './guards/twitter-oauth.guard';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { TwoFactorAuthService } from '../2fa/twoFactorAuth.service';
import { TwoFactorJwtAuthGuard } from '../2fa/guard/twoFactor-jwt-auth-guard';
import { SuccessResponse } from '../../utils/response';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly twoFactorAuthService: TwoFactorAuthService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(200)
  signin(@CurrentUser() user: User, @Query('designId') designId: string) {
    return this.authService.signin(user, designId);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('admin-signin')
  @HttpCode(200)
  superAdminSignin(@CurrentUser() user: User) {
    return this.authService.adminSignin(user);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(TwoFactorJwtAuthGuard)
  @Post('2fa-signin')
  signinWith2fa(@CurrentUser() user: User) {
    return this.twoFactorAuthService.signinWith2fa(user);
  }

  @Public()
  @UseGuards(GoogleOauthGuard)
  @Get('/signin/google')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  googleOauthSignin() {}

  @Public()
  @UseGuards(GoogleOauthGuard)
  @Get('/signin/google/redirect')
  googleOauthRedirect(
    @CurrentUser() user: User,
    @Query('designId') designId: string,
  ) {
    return this.authService.socialSignin(user, designId);
  }

  @Public()
  @UseGuards(TwitterOauthGuard)
  @Get('/signin/twitter')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  twitterOauthSignin() {}

  @Public()
  @UseGuards(TwitterOauthGuard)
  @Get('/signin/twitter/redirect')
  twitterOauthRedirect(
    @CurrentUser() user: User,
    @Query('designId') designId: string,
  ) {
    return this.authService.socialSignin(user, designId);
  }

  @Public()
  @Post('signup')
  signup(
    @Body() signupUserDto: SignupUserDto,
    @Query('designId') designId: string,
  ) {
    return this.authService.signup(signupUserDto, designId);
  }

  @Public()
  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Public()
  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Patch('update-password')
  updatePassword(
    @CurrentUser() user: User,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.authService.updatePassword(user, updatePasswordDto);
  }

  @Get('me')
  findAuthUser(@CurrentUser() user: User) {
    return this.authService.findAuthUser(user.id);
  }
}
