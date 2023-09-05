import { User } from 'src/app/users/entities/user.entity';
import { Status } from 'src/types/status';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column()
  sellerId: string;

  @Column({ type: 'enum', enum: Status, default: Status.ENABLED })
  status:Status ;

  @ManyToMany(() => User)
  @JoinTable()
  customer: User[];
}

