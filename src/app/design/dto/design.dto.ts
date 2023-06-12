import { IsNumber, IsOptional, IsString, IsNotEmpty,IsUUID } from 'class-validator';

export class PublishDesignDto {
  @IsString()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsOptional()
  description: string;


}
export class PublishDesignAndCheckoutDto {
  @IsString()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsOptional()
  description: string;

}
