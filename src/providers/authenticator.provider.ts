import { authenticator } from 'otplib';
import { AuthenticatorProvider } from 'src/types/authenticator';

import { User } from 'src/app/users/entities/user.entity';
import { AUTH_APP_NAME } from 'src/constant';

export class Authenticator implements AuthenticatorProvider {
  constructor() {}

  async generateTwoFactorAuthenticationSecret(user: User) {
    const secret = authenticator.generateSecret();

    const otpAuthUrl = authenticator.keyuri(user.email, AUTH_APP_NAME, secret);
    return {
      secret,
      otpAuthUrl,
    };
  }
  verifyTwoFactorToken(token: string, secret: string) {
    console.log(token, secret);
    return authenticator.verify({
      token,
      secret,
    });
  }

  generate(secret: string) {
    return authenticator.generate(secret);
  }
}
