import { IsArray, IsOptional, IsString } from "class-validator";
import { ColorAndSizes } from "src/types/color-and-sizes";
export class UpdateColorAndSizesPerStateDto {
  @IsArray()
  colorAndSizes: ColorAndSizes[];
}

export class UpdateFeePerStateDto {
  @IsString()
  ownerFee: string;
  @IsString()
  resellerFee: string;
}
