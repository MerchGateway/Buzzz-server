import {
  BaseEntity,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
  OneToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

import { Order } from '../../order/entities/order.entity';
import { Product } from '../../product/product.entity';
import { Size } from 'src/types/size';

@Entity('cart_item')
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinColumn({ name: 'client_id' })
  owner: User;

  @OneToOne(() => Product, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  product: Product;

  @OneToMany(() => Order, (order) => order.cart)
  orders: Order[];

  @Column({
    type: 'integer',
    transformer: { to: (value) => Math.abs(value), from: (value) => value },
  })
  quantity: number;

  @Column({ type: 'integer' })
  total: number;

  @Column({ type: 'enum', enum: Size, nullable: true })
  size: Size;

  @BeforeInsert()
  @BeforeUpdate()
  private async calculateTotal(): Promise<void> {
    console.log('this calculate total ran after');
    this.total = this.product.price * Math.abs(this.quantity);
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
