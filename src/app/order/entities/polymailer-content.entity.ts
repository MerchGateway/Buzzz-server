import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamp } from '../../../database/timestamp.entity';

@Entity()
export class PolymailerContent extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({})
  content: string;
}
