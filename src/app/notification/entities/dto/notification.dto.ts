import {
  IsOptional,
  IsArray,
  IsObject,
  IsString,
  IsUUID,
} from 'class-validator';
import { Status } from '../../../../types/notification';
export class CreateNotificationDto {
  @IsString()
  title: string;
  @IsString()
  message: string;
  @IsUUID()
  userId: string;
}

export class CreateMultipleNotificationDto {
  @IsString()
  title: string;
  @IsString()
  message: string;
 
}