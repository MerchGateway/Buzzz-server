import { Timestamp } from 'src/database/timestamp.entity';
import { NigerianStates } from 'src/types/States';
import { DecimalTransformer } from 'src/utils/transformers/decimal';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DeliveryCost extends Timestamp {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'enum', enum: NigerianStates })
	state: NigerianStates;

	@Column({
		type: 'decimal',
		precision: 10,
		scale: 2,
		transformer: new DecimalTransformer(),
	})
	cost: number;

	@Column()
	address: string;
}
