import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNumber()
  @IsNotEmpty()
  public price: number;

  @IsUUID()
  @IsNotEmpty()
  public categoryId: string;
}

export class EditProductDto {
  @IsString()
  @IsOptional()
  public name: string;

  @IsNumber()
  @IsOptional()
  public price: number;

  @IsUUID()
  @IsOptional()
  public categoryId: string;
}
