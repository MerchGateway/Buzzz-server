import { IsEmail, IsString } from 'class-validator';
import { IdentityProvider } from 'src/types/user';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  firstName?: string;

  lastName?: string;

  @IsString()
  password?: string;

  identityProvider?: IdentityProvider;

  identityProviderId?: string;
}
