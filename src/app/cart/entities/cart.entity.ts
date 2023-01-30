import {
  BaseEntity,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

import { Order } from '../../order/entities/order.entity';
import { Product } from '../../product/product.entity';

@Entity('cart-item')
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinColumn({ name: 'client_id' })
  owner: User;

  @ManyToOne(() => Product, {
    cascade: true,
  })
  @JoinColumn()
  product: Product;

  @OneToOne(() => Order, {
    cascade: true,
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ type: 'integer' })
  quantity: number;

  @Column({ type: 'integer' })
  total: number;

  @BeforeInsert()
  @BeforeUpdate()
  private async calculateTotal() {
    this.total = this.product.price * this.quantity;
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
