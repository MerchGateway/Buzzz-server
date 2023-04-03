import { IsBoolean, IsEmail, IsObject, IsOptional, IsString } from 'class-validator';
import { Authtype } from 'src/types/authenticator';
export class SignupUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
