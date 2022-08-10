import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { IdentityProvider } from 'src/types/user';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {
    super({
      clientID: configService.get<string>('oauth.googleClientId'),
      clientSecret: configService.get<string>('oauth.googleClientSecret'),
      callbackURL:
        configService.get<string>('appUrl') + 'v1/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const { id, name, emails } = profile;

    let user = await this.authService.findOauthUser(
      IdentityProvider.GOOGLE,
      id,
    );

    if (!user) {
      user = await this.usersService.create({
        identityProvider: IdentityProvider.GOOGLE,
        identityProviderId: id,
        name: name.givenName,
        email: emails[0].value,
      });
    }

    return user;
  }
}
