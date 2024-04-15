import {
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
} from 'class-validator';
import { Color } from 'src/types/color';
import { DeliveryMethod } from 'src/types/delivery';
import { Size } from 'src/types/size';

export class CreateCartDto {
	@IsUUID()
	public readonly product: string;

	@IsNumber()
	public readonly quantity: number;

	@IsEnum(Size)
	@IsOptional()
	public readonly size?: Size;

	@IsString()
	@IsOptional()
	public readonly creatorInstructions?: string;

	@IsEnum(Color)
	@IsOptional()
	public readonly color: Color;
}
export class UpdateCartDto {
	@IsNumber()
	@IsOptional()
	public readonly quantity?: number;

	@IsEnum(Size)
	@IsOptional()
	public readonly size?: Size;

	@IsString()
	@IsOptional()
	public readonly creatorInstructions?: string;

	@IsEnum(DeliveryMethod)
	@IsOptional()
	public readonly deliverMethod?: DeliveryMethod;

	@IsEnum(Color)
	public readonly color: Color;
}

export class updateCartDeliveryMethodDto {
	@IsEnum(DeliveryMethod)
	public readonly deliveryMethod: DeliveryMethod;
}
