import { User } from 'src/app/users/entities/user.entity';
import { Status } from 'src/types/status';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Timestamp } from '../../../database/timestamp.entity';

@Entity()
export class Customer extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'seller_id' })
  seller: User;

  @Column({ type: 'enum', enum: Status, default: Status.ENABLED })
  status: Status;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'buyer_id' })
  buyer: User;
}
