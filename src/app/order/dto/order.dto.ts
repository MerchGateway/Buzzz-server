import { IsOptional, IsArray, IsObject, IsEnum } from 'class-validator';
import { Status } from '../../../types/order';
import { Size } from 'src/types/size';
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

  @IsEnum([
    '#ffffff',
    '#808080',
    '#333333',
    '#ff0005',
    '#ff8c00',
    'Green',
    'Red',
    'White',
    'Blue',
    'Orange',
    'Black',
    'Grey',
    'Brown',
    'Pink',
    'Purple',
    'Ash',
  ])
  public readonly color: string;
}
export class UpdateOrderDto {
  @IsOptional()
  @IsArray()
  cart?: any[];

  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
