import { IsOptional, IsArray, IsObject, IsString } from 'class-validator';
import { Status } from '../../../../types/notification';
export class CreateNotificationDto {
  @IsString()
  title: string;
  @IsString()
  message: string;
  @IsString()
  token: string;
 
}
