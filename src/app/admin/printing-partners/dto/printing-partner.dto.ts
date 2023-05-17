import { IsEmail, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';
import { IdentityProvider } from 'src/types/user';

export class CreatePrintingPartnerDto {
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

export class UpdatePrintingPartnerDto {
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




export class CreatePrintingAdminDto {
    
  @IsEmail()
  email: string;

  @IsUUID()
  printing_partner:string;
}

export class UpdatePrintingAdminDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name: string;


}
