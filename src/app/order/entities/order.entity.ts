import {
  BaseEntity,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Status } from '../../../types/order';
import { Cart } from '../../cart/entities/cart.entity';
import { User } from '../../users/entities/user.entity';
@Entity('order')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => User,
    (user) => {
      user.orders;
    },
  )
  @JoinColumn({ name: 'client_id' })
  owner: User;

  // @ManyToMany(
  //   (type) => Cart,
  //   (cart) => {
  //     cart.item;
  //   },
  // )
  // @JoinTable()
  // commodities: Cart[];
  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
