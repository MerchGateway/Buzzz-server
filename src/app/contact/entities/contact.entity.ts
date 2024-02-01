import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamp } from '../../../database/timestamp.entity';

@Entity()
export class Contact extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'email',
  })
  email: string;

  @Column()
  message: string;
}
