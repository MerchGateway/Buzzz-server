import {
  IsNumber,
  IsEnum,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsUUID,
  IsArray,
  IsBoolean,
  IsNotEmptyObject,
  ArrayNotEmpty,
} from 'class-validator';
import { ColorAndSizes } from 'src/types/color-and-sizes';
export class UpdateColorAndSizesDto {
  @IsArray()
  colorAndSizes: ColorAndSizes[];
}
