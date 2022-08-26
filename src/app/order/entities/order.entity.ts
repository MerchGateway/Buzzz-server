import { Transaction } from 'src/app/transaction/entities/transaction.entity';
import {
  BaseEntity,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
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

  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinColumn({ name: 'client_id' })
  user: User;

  @ManyToOne(() => Transaction, (transaction) => transaction.orders, {
    cascade: true,
  })
  @JoinColumn({ name: 'transaction_id' })
  transaction: Transaction;

  @OneToOne(() => Cart, { cascade: true })
  @JoinColumn({ name: 'cart_item_id' })
  cart: Cart;

  @Column({ type: 'simple-json' })
  shipping_details: { shipping_fee: number; shipping_address: string };

  @Column({ nullable: true, default: 0, type: 'decimal', precision: 10 })
  delivery_fee: number;

  @Column({ type: 'varchar', nullable: true })
  coupon: string;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: string;

  @BeforeInsert()
  @BeforeUpdate()
  private async setDeliveryFee() {}

  public async setCoupon(value: string) {
    this.coupon = value;
  }
  public async updateStatus(value: string) {
    this.status = value;
  }
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
