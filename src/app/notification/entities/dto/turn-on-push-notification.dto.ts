import { IsOptional, IsArray, IsObject, IsString } from 'class-validator';

export class TurnOnPushNotificationDto {
  @IsString()
  registerationToken: string;
}
