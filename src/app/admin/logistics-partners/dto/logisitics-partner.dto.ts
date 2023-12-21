import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';
import { Status } from 'src/types/status';

export class CreateLogisticsPartnerDto {
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

export class UpdateLogisticsPartnerDto {
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

export class CreateLogisticsAdminDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class UpdateLogisticsAdminDto {
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
