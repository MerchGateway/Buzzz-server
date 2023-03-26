import { IsObject } from 'class-validator';

export class Toggle2faDto {
  @IsObject()
 allow2fa : boolean;
}
