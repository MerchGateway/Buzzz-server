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
import { Color } from 'src/types/color';

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

  @Column({ type: 'enum', enum: Size, nullable: true ,default:Size.M})
  size: Size;

  @Column({ type: 'enum', enum: Color,nullable:true })
  color: Color;

  @BeforeInsert()
  @BeforeUpdate()
  private async calculateTotal(): Promise<void> {
    this.total = this.product.price * Math.abs(this.quantity);
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async addColor(): Promise<void> {
    !this.color &&
      this.product &&
      (this.color = this.product.design.design_data.background);
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
