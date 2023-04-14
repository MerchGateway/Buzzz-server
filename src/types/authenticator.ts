import { User } from 'src/app/users/entities/user.entity';

export enum Authtype {
  GOOGLE = 'google',
  INAPP = 'in-app',
}
export interface SecretResponse {
  secret: string;
  otpauthUrl: string;
}

export interface AuthenticatorProvider {
  generateTwoFactorAuthenticationSecret: (
    user: User,
  ) => Promise<SecretResponse>;
  verifyTwoFactorToken: (token: string, secret: string) => boolean;
  generate: (secret: string) => string;
}
