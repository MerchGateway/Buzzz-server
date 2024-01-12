import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { COLOR_AND_SIZE_PER_STATE } from './data';
import { ColorsAndSizes } from 'src/app/colors-and-sizes/entities/colors-and-sizes.entity';

@Injectable()
export class ColorAndSizesSeederService {
  constructor(
    @InjectRepository(ColorsAndSizes)
    private colorAndSizesRepository: Repository<ColorsAndSizes>,
  ) {}

  public async createAvailableColorsAndSizesPerState() {
    const colorAndSizesPerState = this.colorAndSizesRepository.create(
      COLOR_AND_SIZE_PER_STATE,
    );
    return await this.colorAndSizesRepository.save(colorAndSizesPerState);
  }
}
