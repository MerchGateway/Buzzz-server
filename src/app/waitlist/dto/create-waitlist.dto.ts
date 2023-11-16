import { IsEmail } from 'class-validator';

export class CreateWaitlistDto {
  @IsEmail()
  client: string;
}
