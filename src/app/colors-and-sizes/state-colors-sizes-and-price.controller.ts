import {
  Body,
  Controller,
  Get,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
  Put,
  Patch,
} from "@nestjs/common";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/types/general";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Public } from "src/decorators/public.decorator";
import { ColorAndSizesService } from "./state-colors-sizes-and-price.service";
import { ColorsAndSizes } from "./entities/state-colors-sizes-and-price.entity";
import { NigerianStates } from "src/types/States";
import { ColorAndSizes } from "src/types/color-and-sizes";
import {
  UpdateColorAndSizesPerStateDto,
  UpdateFeePerStateDto,
} from "./dto/state-colors-sizes-and-price.dto";

@Controller("colors-and-sizes-in-state")
export class ColorAndSizesController {
  constructor(private readonly colorAndSizeService: ColorAndSizesService) {}

  @Public()
  @Get("")
  @HttpCode(HttpStatus.OK)
  private getColorsAndSizesPerState(
    @Query("state") state: NigerianStates
  ): Promise<ColorsAndSizes> {
    return this.colorAndSizeService.getColorsAndSizesInState(state);
  }

  @Put("")
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  private updateColorAndSizesAvailablePerState(
    @Query("state") state: NigerianStates,
    @Body() data: UpdateColorAndSizesPerStateDto
  ): Promise<ColorsAndSizes> {
    return this.colorAndSizeService.updateColorsAndSizesInState(state, data);
  }
  @Patch("")
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  private updateFeePerState(
    @Query("state") state: NigerianStates,
    @Body() data: UpdateFeePerStateDto
  ): Promise<ColorsAndSizes> {
    return this.colorAndSizeService.updateFeeInState(state, data);
  }
}
