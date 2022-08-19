import {
  BaseEntity,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
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
  )
  @JoinColumn({ name: 'client_id' })
  user: User;

  @OneToOne(
    () => Cart,
   
  )
  @JoinColumn({ name: 'cart_item_id' })
  cart:Cart;


  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  shipping_fee: number;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
