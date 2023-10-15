import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamp } from '../../../database/timestamp.entity';
import { DecimalTransformer } from '../../../utils/transformers/decimal';

@Entity()
export class Fee extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  owner: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  reseller: number;
}
