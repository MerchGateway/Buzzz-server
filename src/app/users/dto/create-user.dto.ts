import { IsEmail, IsString } from 'class-validator';
import { IdentityProvider } from 'src/types/user';

export class CreateUserDto {
  @IsEmail()
  email: string;
  
  @IsString()
  name: string;

  @IsString()
  password?: string;

  identityProvider?: IdentityProvider;

  identityProviderId?: string;
}
