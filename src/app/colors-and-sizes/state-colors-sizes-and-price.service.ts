import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ColorsAndSizes } from "src/app/colors-and-sizes/entities/state-colors-sizes-and-price.entity";
import { ColorAndSizes } from "src/types/color-and-sizes";
import { NigerianStates } from "src/types/States";
import {
  UpdateColorAndSizesPerStateDto,
  UpdateFeePerStateDto,
} from "./dto/state-colors-sizes-and-price.dto";
UpdateFeePerStateDto;
@Injectable()
export class ColorAndSizesService {
  constructor(
    @InjectRepository(ColorsAndSizes)
    private colorAndSizesRepository: Repository<ColorsAndSizes>
  ) {}

  public async getColorsAndSizesInState(state: NigerianStates) {
    return await this.colorAndSizesRepository.findOne({ where: { state } });
  }

  public async updateColorsAndSizesInState(
    state: NigerianStates,
    data: UpdateColorAndSizesPerStateDto
  ) {
    const stateData = await this.getColorsAndSizesInState(state);
    stateData.colorAndSizes = [
      ...stateData.colorAndSizes,
      ...data.colorAndSizes,
    ];
    return await this.colorAndSizesRepository.save(stateData);
  }

  public async updateFeeInState(
    state: NigerianStates,
    data: UpdateFeePerStateDto
  ) {
    const stateData = await this.getColorsAndSizesInState(state);
    stateData.ownerFee = parseInt(data.ownerFee);
    stateData.resellerFee = parseInt(data.resellerFee);

    return await this.colorAndSizesRepository.save(stateData);
  }
}
