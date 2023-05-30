import {
  IsEmail,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Status } from 'src/types/status';
import { IdentityProvider } from 'src/types/user';

export class CreatePrintingPartnerDto {
  @IsString()
  name: string;

  @IsObject()
  partner_address: {
    address: string;
    state: string;
    LGA: string;
    city: string;
  };


}

export class UpdatePrintingPartnerDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEnum(Status)
 
  @IsOptional()
  status:Status;

  @IsObject()
  @IsOptional()
  partner_address: {
    address: string;
    state: string;
    LGA: string;
    city: string;
  };


}

export class CreatePrintingAdminDto {
  @IsEmail()
  email: string;


  @IsString()
  password: string;
}

export class UpdatePrintingAdminDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  password: string;
}
