import { User } from 'src/app/users/entities/user.entity';
import { Status } from 'src/types/status';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Timestamp } from '../../../database/timestamp.entity';

@Entity()
export class Customer extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'seller_id' })
  sellerId: string;

  @Column({ type: 'enum', enum: Status, default: Status.ENABLED })
  status: Status;

  @ManyToMany(() => User)
  @JoinTable({ name: 'customer_user' })
  user: User[];
}
