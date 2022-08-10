import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-twitter';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { IdentityProvider } from 'src/types/user';
import { AuthService } from '../auth.service';

@Injectable()
export class TwitterOauthStrategy extends PassportStrategy(
  Strategy,
  'twitter',
) {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {
    super({
      consumerKey: configService.get<string>('oauth.twitterConsumerKey'),
      consumerSecret: configService.get<string>('oauth.twitterConsumerSecret'),
      callbackURL:
        configService.get<string>('appUrl') + 'v1/auth/twitter/redirect',
      includeEmail: true,
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const { id, name, emails } = profile;

    let user = await this.authService.findOauthUser(
      IdentityProvider.TWITTER,
      id,
    );

    if (!user) {
      user = await this.usersService.create({
        identityProvider: IdentityProvider.TWITTER,
        identityProviderId: id,
        name: name.givenName,
        email: emails[0].value,
      });
    }

    return user;
  }
}
