import { IsString, MinLength, MaxLength } from 'class-validator';

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
  public readonly name?: string;
  public readonly description?: string;
}
