import { User } from 'src/app/users/entities/user.entity';

export enum AuthType {
  GOOGLE = 'GOOGLE',
  IN_APP = 'IN_APP',
}
export interface SecretResponse {
  secret: string;
  otpAuthUrl: string;
}

export interface AuthenticatorProvider {
  generateTwoFactorAuthenticationSecret: (
    user: User,
  ) => Promise<SecretResponse>;
  verifyTwoFactorToken: (token: string, secret: string) => boolean;
  generate: (secret: string) => string;
}
