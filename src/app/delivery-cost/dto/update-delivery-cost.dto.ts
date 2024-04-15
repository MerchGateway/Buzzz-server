import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryCostDto } from './create-delivery-cost.dto';

export class UpdateDeliveryCostDto extends PartialType(CreateDeliveryCostDto) {}
