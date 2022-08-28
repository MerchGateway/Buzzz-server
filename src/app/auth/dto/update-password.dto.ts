import { IsString } from 'class-validator';
import { Match } from 'src/decorators/match.decorator';

export class UpdatePasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  password: string;

  @IsString()
  @Match(UpdatePasswordDto, (updatePasswordDto) => updatePasswordDto.password)
  confirmPassword: string;
}
