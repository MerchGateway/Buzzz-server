import { IsNumberString } from 'class-validator';
import { Match } from '../../../decorators/match.decorator';

export class UpdatePinDto {
  @IsNumberString({
    length: 4,
  })
  oldPin: string;

  @IsNumberString({
    length: 4,
  })
  newPin: string;

  @IsNumberString({
    length: 4,
  })
  @Match(UpdatePinDto, (setPinDto) => setPinDto.newPin, {
    message: 'Pins do not match',
  })
  confirmNewPin: string;
}
