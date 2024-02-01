import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
// import { Broker, PaymentStatus } from '../entities/payment.entity';

export class CreatePayRefDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public amount: number;
}

export class PaymentReceiptDto {
  @IsString()
  @IsNotEmpty()
  public user_id: string;

  @IsUUID()
  @IsNotEmpty()
  public productId: string;

  @IsString()
  @IsNotEmpty()
  public reference: string;

  @IsString()
  @IsNotEmpty()
  public currency: string;

  @IsString()
  @IsNotEmpty()
  public broker: string;

  @IsString()
  @IsNotEmpty()
  public payment_status: string;
}
