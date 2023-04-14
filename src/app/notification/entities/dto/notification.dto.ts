import {
  IsString,

  IsEmail,
} from 'class-validator';
import { Status } from '../../../../types/notification';
export class CreateNotificationDto {
  @IsString()
  title: string;
  @IsString()
  message: string;
  @IsEmail()
  email: string;
}

export class CreateMultipleNotificationDto {
  @IsString()
  title: string;
  @IsString()
  message: string;
 
}