import { IsOptional, IsArray, IsObject, IsEnum } from 'class-validator';
import { Status } from '../../../types/order';
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
export class UpdateOrderDto {
  @IsOptional()
  @IsArray()
  cart?: any[];

  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
