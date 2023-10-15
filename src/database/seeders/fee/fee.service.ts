import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fee } from '../../../app/fee/entities/fee.entity';
import { Repository } from 'typeorm';
import { OWNER_FEE, RESELLER_FEE } from './data';

@Injectable()
export class FeeSeederService {
  constructor(
    @InjectRepository(Fee)
    private feeRepository: Repository<Fee>,
  ) {}

  async create() {
    const existingDefaultFee = await this.feeRepository.findOne({
      where: {
        owner: OWNER_FEE,
        reseller: RESELLER_FEE,
      },
    });

    if (existingDefaultFee) {
      return existingDefaultFee;
    }

    const fee = this.feeRepository.create({
      owner: OWNER_FEE,
      reseller: RESELLER_FEE,
    });

    return await this.feeRepository.save(fee);
  }
}
