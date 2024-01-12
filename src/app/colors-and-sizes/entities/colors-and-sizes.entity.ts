import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamp } from '../../../database/timestamp.entity';
import { NigerianStates } from 'src/types/States';
import { ColorAndSizes } from 'src/types/color-and-sizes';

@Entity()
export class ColorsAndSizes extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: NigerianStates })
  state: NigerianStates;

  @Column({ type: 'simple-array' })
  colorAndSizes: ColorAndSizes[];
}
