import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(3)
  @MaxLength(16)
  public readonly name: string;
  @IsString()
  @MinLength(5)
  @MaxLength(80)
  public readonly description: string;
}
export class UpdateCategoryDto {
  @IsString()
  @MinLength(3)
  @MaxLength(16)
  @IsOptional()
  public readonly name?: string;
  @IsString()
  @MinLength(5)
  @MaxLength(80)
  @IsOptional()
  public readonly description?: string;
}
