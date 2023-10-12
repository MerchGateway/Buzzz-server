import {
  Entity,
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
import { Product } from '../../product/entities/product.entity';
import { Size } from '../../../types/size';
import { Timestamp } from '../../../database/timestamp.entity';

@Entity()
export class Cart extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Product, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'product_id' })
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

  @Column({ type: 'enum', enum: Size, nullable: true, default: Size.M })
  size: Size;

  @Column({
    type: 'enum',
    enum: [
      '#ffffff',
      '#808080',
      '#333333',
      '#ff0005',
      '#ff8c00',
      'Green',
      'Red',
      'White',
      'Blue',
      'Orange',
      'Black',
      'Grey',
      'Brown',
      'Pink',
      'Purple',
      'Ash',
    ],
    nullable: true,
  })
  color: string | null;

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
      (this.color = this.product.design.designData.background);
  }
}
