import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  Get,
} from '@nestjs/common';
import { Public } from '../../decorators/public.decorator';
import { CurrentUser } from '../../decorators/user.decorator';
import { User } from 'src/app/users/entities/user.entity';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LocalSigninDto } from './dto/local-signin.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SignupUserDto } from './dto/signup-user.dto';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { TwitterOauthGuard } from './guards/twitter-oauth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(200)
  signin(@Body() localSignin: LocalSigninDto, @CurrentUser() user: User) {
    return this.authService.signin(user);
  }

  @Public()
  @UseGuards(GoogleOauthGuard)
  @Get('/signin/google')
  googleOauthSignin() {}

  @Public()
  @UseGuards(GoogleOauthGuard)
  @Get('/signin/google/redirect')
  googleOauthRedirect(@CurrentUser() user: User) {
    return this.authService.postSignin(user);
  }

  @Public()
  @UseGuards(TwitterOauthGuard)
  @Get('/signin/twitter')
  twitterOauthSignin() {}

  @Public()
  @UseGuards(TwitterOauthGuard)
  @Get('/signin/twitter/redirect')
  twitterOauthRedirect(@CurrentUser() user: User) {
    return this.authService.postSignin(user);
  }

  @Public()
  @Post('signup')
  signup(@Body() signupUserDto: SignupUserDto) {
    return this.authService.signup(signupUserDto);
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
}
