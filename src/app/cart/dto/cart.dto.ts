import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateCartDto {
  @IsUUID()
  public readonly product: string;

  @IsNumber()
  public readonly quantity: number;
}
export class UpdateCartDto {
  @IsUUID()
  @IsOptional()
  public readonly order?: string;

  @IsNumber()
  @IsOptional()
  public readonly quantity?: number;
}
