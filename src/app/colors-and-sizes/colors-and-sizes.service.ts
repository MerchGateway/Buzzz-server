import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColorsAndSizes } from 'src/app/colors-and-sizes/entities/colors-and-sizes.entity';
import { ColorAndSizes } from 'src/types/color-and-sizes';
import { NigerianStates } from 'src/types/States';
@Injectable()
export class ColorAndSizesService {
  constructor(
    @InjectRepository(ColorsAndSizes)
    private colorAndSizesRepository: Repository<ColorsAndSizes>,
  ) {}

  public async getColorsAndSizesInState(state: NigerianStates) {
    return await this.colorAndSizesRepository.findOne({ where: { state } });
  }

  public async updateColorsAndSizesInState(
    state: NigerianStates,
    data: ColorAndSizes,
  ) {
    const colorsAndSizeDataInState = await this.getColorsAndSizesInState(state);
    colorsAndSizeDataInState.colorAndSizes = [
      ...colorsAndSizeDataInState.colorAndSizes,
      data,
    ];
    return await this.colorAndSizesRepository.save(colorsAndSizeDataInState);
  }
}
