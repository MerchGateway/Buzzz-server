import { Product } from 'src/app/product/product.entity';
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
} from 'typeorm';

import { Status } from '../../../types/order';
import { Cart } from '../../cart/entities/cart.entity';
import { User } from '../../users/entities/user.entity';
import { PrintingPartner } from 'src/app/admin/printing-partners/entities/printing-partner.entity';
import { LogisticsPartner } from 'src/app/admin/logistics-partners/entities/logistics-partner.entity';
@Entity('order')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'client_id' })
  user: User;

  @ManyToOne(() => Transaction, (transaction) => transaction.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'transaction_id' })
  transaction: Transaction;

  @ManyToOne(() => Cart, (cart) => cart.orders, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'cart_item_id' })
  cart: Cart;

  @ManyToOne(() => Product, {
    eager: true,
    onDelete: 'SET NULL',
  })
  product: Product;

  @Column()
  sellerId: string;

  @Column({ type: 'numeric', nullable: true })
  quantity: number;

  @Column({ type: 'numeric', nullable: true })
  total: number;

  @Column({ type: 'simple-json', default: null, nullable: true })
  shipping_details!: {
    shipping_fee: number;
    shipping_address: {
      street_number: number;
      state: string;
      LGA: string;
      street: string;
      Nearest_bustop: string;
    };
  };

  @Column({ type: 'simple-json', default: null, nullable: true })
  polymailer_details: {
    from: string;
    to: string;
    content: string;
  };

  @Column({ nullable: true, default: 0, type: 'decimal', precision: 10 })
  delivery_fee: number;

  @Column({ type: 'varchar', default: '', nullable: true })
  coupon: string;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: string;

  @ManyToOne(() => PrintingPartner, (partner) => partner.orders, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  printing_partner: PrintingPartner;

  @ManyToOne(() => LogisticsPartner, (logistics) => logistics.orders, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  logistics_partner: LogisticsPartner;

  @BeforeInsert()
  @BeforeUpdate()
  private async setDeliveryFee() {
    // todo shipping fee logic
  }

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
