import { IsNumber,IsEnum, IsOptional, IsString, IsNotEmpty,IsUUID } from 'class-validator';
import { Color } from 'src/types/color';
import { Size } from 'src/types/size';
export class PublishDesignDto {
  @IsString()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

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
  @IsOptional()
  public readonly color: Color;

  @IsString()
  @IsNotEmpty()
  public thumbnail: string;

}
