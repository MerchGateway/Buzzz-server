import { Injectable } from '@nestjs/common';
import { CreateFeeDto } from './dto/create-fee.dto';
import { UpdateFeeDto } from './dto/update-fee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Fee } from './entities/fee.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { SuccessResponse } from '../../utils/response';

@Injectable()
export class FeeService {
  constructor(
    @InjectRepository(Fee)
    private feeRepository: Repository<Fee>,
  ) {}

  create(createFeeDto: CreateFeeDto) {
    return 'This action adds a new fee';
  }

  findAll() {
    return `This action returns all fee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fee`;
  }

  update(id: number, updateFeeDto: UpdateFeeDto) {
    return `This action updates a #${id} fee`;
  }

  remove(id: number) {
    return `This action removes a #${id} fee`;
  }

  // Get the latest fee from the DB and return  as is
  async getLatest() {
    return await this.feeRepository.findOne({
      where: {
        id: Not(IsNull()),
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findLatest() {
    const fee = await this.getLatest();
    return new SuccessResponse(fee, 'Latest Fee retrieved successfully');
  }
}
