import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';
import { AuthType } from 'src/types/authenticator';

export class Toggle2faDto {
  @IsBoolean()
  allow2fa: boolean;

  @IsOptional()
  @IsString()
  twoFactorType: string;
}
