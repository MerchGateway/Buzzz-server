import {
  Body,
  Controller,
  Get,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
  Put,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/types/general';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Public } from 'src/decorators/public.decorator';
import { ColorAndSizesService } from './colors-and-sizes.service';
import { ColorsAndSizes } from './entities/colors-and-sizes.entity';
import { NigerianStates } from 'src/types/States';
import { ColorAndSizes } from 'src/types/color-and-sizes';

@Controller('colors-and-sizes-in-state')
export class ColorAndSizesController {
  constructor(private readonly colorAndSizeService: ColorAndSizesService) {}

  @Public()
  @Get('')
  @HttpCode(HttpStatus.OK)
  private getColorsAndSizesPerState(
    @Query('state') state: NigerianStates,
  ): Promise<ColorsAndSizes> {
    return this.colorAndSizeService.getColorsAndSizesInState(state);
  }

  @Put('')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  private updateColorAndSizesAvailablePerState(
    @Query('state') state: NigerianStates,
    @Body() data: ColorAndSizes,
  ): Promise<ColorsAndSizes> {
    return this.colorAndSizeService.updateColorsAndSizesInState(state, data);
  }
}
