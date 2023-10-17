import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsUUID,
  MaxLength,
  IsBoolean,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNumber()
  @IsNotEmpty()
  public price: number;

  @IsString()
  @IsOptional()
  public description: string;

  @IsString()
  @IsNotEmpty()
  public thumbnail: string;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;

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

  @IsString()
  @IsOptional()
  @MaxLength(40)
  @MinLength(10)
  public bio: string;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;

  @IsString()
  @IsOptional()
  public description: string;
}
