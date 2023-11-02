import { IsOptional, IsArray, IsObject } from 'class-validator';
import { Status } from '../../../types/order';
export class CreateOrderDto {
  @IsObject()
  shippingAddress: {
    state: string;
    LGA: string;
    address: string;
  };
}
export class UpdateOrderDto {
  // @IsString()
  // @IsOptional()
  // owner?:string;
  // @IsArray()
  // @IsOptional()
  @IsArray()
  cart?: any[];
  // @IsNumber()
  // @IsOptional()
  // shipping_fee:number;
  // @IsString()
  @IsOptional()
  status?: Status;
}
