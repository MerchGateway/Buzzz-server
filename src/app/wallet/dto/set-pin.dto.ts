import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { Match } from '../../../decorators/match.decorator';

export class SetPinDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumberString({
    length: 4,
  })
  pin: string;

  @IsNumberString({
    length: 4,
  })
  @Match(SetPinDto, (setPinDto) => setPinDto.pin, {
    message: 'Pins do not match',
  })
  confirmPin: string;
}
