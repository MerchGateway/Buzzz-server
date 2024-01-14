import { IsEnum, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { Color } from 'src/types/color';
import { Size } from 'src/types/size';

export class CreateCartDto {
  @IsUUID()
  public readonly product: string;

  @IsNumber()
  public readonly quantity: number;

  @IsEnum(Size)
  @IsOptional()
  public readonly size?: Size;

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
  @IsEnum(Color)
  public readonly color: Color;
}
