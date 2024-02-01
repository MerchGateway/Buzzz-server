import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Status } from '../../../types/notification';
import { User } from '../../users/entities/user.entity';
import { Timestamp } from '../../../database/timestamp.entity';
@Entity()
export class Notification extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column({ type: 'enum', enum: Status, default: Status.UNREAD })
  status: string;
}
