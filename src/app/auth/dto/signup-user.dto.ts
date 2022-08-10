import { IsEmail, IsString } from 'class-validator';

export class SignupUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
