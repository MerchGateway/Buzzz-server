import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateWaitlistDto {
  @IsNotEmpty()
  @IsEmail()
  client: string;
}
