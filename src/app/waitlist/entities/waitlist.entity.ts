import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { Timestamp } from '../../../database/timestamp.entity';

@Entity()
export class Waitlist extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  client: string;
}
