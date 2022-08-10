import { IsString } from 'class-validator';
import { Match } from 'src/decorators/match.decorator';

export class ResetPasswordDto {
  @IsString()
  token: string;

  @IsString()
  password: string;

  @IsString()
  @Match(ResetPasswordDto, (resetPasswordDto) => resetPasswordDto.password)
  confirmPassword: string;
}
