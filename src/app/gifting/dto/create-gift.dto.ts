import {
  ArrayNotEmpty,
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateGiftDto {
  @IsUUID()
  product: string;
  @IsArray()
  @ArrayNotEmpty()
  recievers: string[];
  @IsString()
  @IsOptional()
  note?: string;
  @IsString()
  @IsOptional()
  quantity?: string;
}
