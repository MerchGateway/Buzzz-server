 import { IsString, MinLength, MaxLength, IsOptional,IsArray,IsNumber, IsUUID } from 'class-validator';
import { Status } from '../../../types/order';
export class CreateOrderDto {

    @IsNumber()
    shipping_fee:number;
    @IsString()
    status:Status;


}
export class UpdateOrderDto {
    // @IsString()
    // @IsOptional()
    // owner?:string;
    // @IsArray()
    // @IsOptional()
    @IsArray()
    cart?:string[];
    // @IsNumber()
    // @IsOptional()
    // shipping_fee:number;
    // @IsString()
    // @IsOptional()
    // status:Status;
    
}
