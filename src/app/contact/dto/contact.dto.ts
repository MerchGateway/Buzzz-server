import { IsEmail, IsString } from 'class-validator';

export class ContactUsDto {
  @IsEmail()
  email: string;
  @IsString()
  message: string;
}
