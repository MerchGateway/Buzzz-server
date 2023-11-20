import { IsArray, IsUUID } from 'class-validator';

export class CreateGiftDto {
  @IsUUID()
  product: string;
  @IsArray()
  recievers: string[];
}
