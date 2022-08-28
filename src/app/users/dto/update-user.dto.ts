import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  bio: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  address: string;

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
}
