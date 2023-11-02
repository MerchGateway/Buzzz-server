import {
  IsBoolean,
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  bio: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsObject()
  @IsOptional()
  shippingAddress: {
    state: string;
    LGA: string;
    address: string;
  };

  @IsBoolean()
  @IsOptional()
  isPublic: boolean;

  @IsBoolean()
  @IsOptional()
  showEmail: boolean;

  @IsUrl()
  @IsOptional()
  instagram: string;

  @IsUrl()
  @IsOptional()
  facebook: string;

  @IsUrl()
  @IsOptional()
  twitter: string;

  @IsUrl()
  @IsOptional()
  reddit: string;

  @IsBoolean()
  @IsOptional()
  allowNotification: boolean;

  @IsObject()
  @IsOptional()
  twoFactorAuthentication: {
    allow2fa: boolean;
    isTwoFactorVerified: boolean;
  };
}
