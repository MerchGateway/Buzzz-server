import {
  IsNumber,
  IsEnum,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsArray,
  IsBoolean,
  ArrayNotEmpty,
} from 'class-validator';
import { Color } from 'src/types/color';
import { Size } from 'src/types/size';
export class PublishDesignDto {
  @IsString()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsBoolean()
  @IsOptional()
  public readonly isPublic?: boolean;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  public thumbnail: string;
}
export class PublishDesignAndCheckoutDto {
  @IsString()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsOptional()
  description: string;
  @IsEnum(Size)
  @IsOptional()
  public readonly size?: Size;

  @IsEnum(Color)
  public readonly color: Color;

  @IsBoolean()
  @IsOptional()
  public readonly isPublic?: boolean;

  @IsString()
  @IsNotEmpty()
  public thumbnail: string;
}
export class PublishAndGiftDto extends PublishDesignDto {
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
