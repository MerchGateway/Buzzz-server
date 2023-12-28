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
  @IsEnum(Status)
  @IsOptional()
  status?: Status;
}
