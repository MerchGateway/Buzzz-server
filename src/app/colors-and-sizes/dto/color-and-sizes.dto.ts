import { IsArray } from 'class-validator';
import { ColorAndSizes } from 'src/types/color-and-sizes';
export class UpdateColorAndSizesDto {
  @IsArray()
  colorAndSizes: ColorAndSizes[];
}
