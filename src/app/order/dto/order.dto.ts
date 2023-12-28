import { IsOptional, IsArray, IsObject } from 'class-validator';
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
  @IsArray()
  cart?: any[];
  @IsOptional()
  status?: Status;
}
