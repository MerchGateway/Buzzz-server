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
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'transaction_id' })
  transaction: Transaction;

  @ManyToOne(() => Cart, (cart) => cart.orders, {
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn({ name: 'cart_item_id' })
  cart: Cart;

  @Column({ type: 'simple-json', nullable: true })
  product: any;

  @Column({ type: 'numeric', nullable: true })
  quantity: number;

  @Column({ type: 'numeric', nullable: true })
  total: number;

  @Column({ type: 'simple-json' })
  shipping_details: {
    shipping_fee: number;
    shipping_address: {
      street_number: number;
      state: string;
      LGA: string;
      street: string;
      Nearest_bustop: string;
    };
  };

  @Column({ nullable: true, default: 0, type: 'decimal', precision: 10 })
  delivery_fee: number;

  @Column({ type: 'varchar', nullable: true })
  coupon: string;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: string;

  @BeforeInsert()
  @BeforeUpdate()
  private async setDeliveryFee() {
    // todo shipping fee logic
  }
  // delete already ordered cart item

  @BeforeInsert()
  @BeforeUpdate()
  private async updateProductDetails() {
    if (this.cart) {
      this.product = this.cart.product;
      this.quantity = this.cart.quantity;
      this.total = this.cart.total;
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async shippingFee() {
    //todo shipping fee logic
  }
  public async addCoupon(value: string) {
    this.coupon = value;
  }

  public async updateStatus(value: string) {
    this.status = value;

    if (this.status === Status.PAID) {
      // delete this.cart;
      if (this.cart) {
        Cart.remove(this.cart);
      }
    }
  }
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
