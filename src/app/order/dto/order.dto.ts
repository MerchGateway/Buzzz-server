import { IsOptional, IsArray, IsObject, IsEnum } from 'class-validator';
import { Status } from '../../../types/order';
import { Size } from 'src/types/size';
import { Color } from 'src/types/color';
export class CreateOrderDto {
  @IsObject()
  shippingAddress: {
    state: string;
    LGA: string;
    address: string;
    latitude: number;
    longitude: number;
  };
}
export class CreateGiftOrderDto extends CreateOrderDto {
  @IsEnum(Size)
  public readonly size: Size;

  @IsEnum(Color)
  public readonly color: Color;
}
export class UpdateOrderDto {
  @IsOptional()
  @IsArray()
  cart?: any[];

  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
