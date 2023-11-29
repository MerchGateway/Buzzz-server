import {
  IsArray,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateGiftDto {
  @IsUUID()
  product: string;
  @IsArray()
  @IsNotEmptyObject()
  recievers: string[];
  @IsString()
  @IsOptional()
  note?: string;
}
