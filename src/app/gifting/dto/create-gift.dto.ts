import { IsArray, IsEmail, IsUUID, isNotEmpty } from 'class-validator';

export class CreateGiftDto {
  @IsUUID()
  product: string;
  @IsArray()
  recievers: string[];
}
