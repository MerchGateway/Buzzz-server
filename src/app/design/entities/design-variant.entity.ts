import {
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
} from 'typeorm';
import { ImageBody } from '../../../types/asset';
import { Timestamp } from '../../../database/timestamp.entity';
import { Design } from './design.entity';
import { DesignData } from '../../../types/websocket';

@Entity()
export class DesignVariant extends Timestamp {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => Design, (design) => design.variants, {
		onDelete: 'CASCADE',
		eager: true,
	})
	@JoinColumn({ name: 'design_id' })
	design: Design;

	@Column({
		name: 'design_data',
		type: 'simple-json',
		collation: 'utf8mb4_unicode_ci',
	})
	designData: DesignData;

	@Column({
		type: 'simple-json',
		nullable: true,
	})
	images: ImageBody[] | null;

	@Column({
		type: 'simple-array',
		nullable: true,
		collation: 'utf8mb4_unicode_ci',
	})
	texts: string[] | null;
}
