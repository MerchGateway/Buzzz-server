import { IsOptional, IsArray, IsObject } from 'class-validator';
import { Status } from '../../../types/order';
export class CreateOrderDto {
  @IsObject()
  shipping_address: {
    street_number: number;
    state: string;
    LGA: string;
    Nearest_bustop: string;
    street:string
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