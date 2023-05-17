import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateLogisticsPartnerDto {
  @IsString()
  name: string;
  @IsObject()
  partner_address: {
    street_number: number;
    state: string;
    LGA: string;
    zipcode: number;
  };
}

export class UpdateLogisticsPartnerDto {
  @IsString()
  @IsOptional()
  name: string;
  @IsObject()
  @IsOptional()
  partner_address: {
    street_number: number;
    state: string;
    LGA: string;
    zipcode: number;
  };
}

export class CreateLogisticsAdminDto {
  @IsEmail()
  email: string;

  @IsUUID()
  logistics_partner: string;
}

export class UpdateLogisticsAdminDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name: string;

}
