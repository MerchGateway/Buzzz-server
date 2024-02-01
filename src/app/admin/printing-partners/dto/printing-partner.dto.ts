import {
  IsEmail,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from 'src/types/status';

export class CreatePrintingPartnerDto {
  @IsString()
  name: string;

  @IsObject()
  address: {
    address: string;
    state: string;
    LGA: string;
    city: string;
    latitude: number;
    longitude: number;
  };
}

export class UpdatePrintingPartnerDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEnum(Status)
  @IsOptional()
  status: Status;

  @IsObject()
  @IsOptional()
  address: {
    address: string;
    state: string;
    LGA: string;
    city: string;
    latitude: number;
    longitude: number;
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
