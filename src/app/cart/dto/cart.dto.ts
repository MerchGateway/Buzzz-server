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
  @IsOptional()
  public readonly color:string;
}
export class UpdateCartDto {
  @IsNumber()
  @IsOptional()
  public readonly quantity?: number;

  @IsEnum(Size)
  @IsOptional()
  public readonly size?: Size;
  @IsEnum(Color)
  @IsOptional()
  public readonly color?: Color;
}
