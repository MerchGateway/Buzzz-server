import { IsEnum, IsNumber, IsString } from 'class-validator';
import { NigerianStates } from 'src/types/States';

export class CreateDeliveryCostDto {
	@IsEnum(NigerianStates)
	state: NigerianStates;

	@IsNumber()
	cost: number;

	@IsString()
	address: string;
}
