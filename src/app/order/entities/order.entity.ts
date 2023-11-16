import { Product } from 'src/app/product/entities/product.entity';
import { Transaction } from 'src/app/transaction/entities/transaction.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Status } from '../../../types/order';
import { Cart } from '../../cart/entities/cart.entity';
import { User } from '../../users/entities/user.entity';
import { PrintingPartner } from 'src/app/admin/printing-partners/entities/printing-partner.entity';
import { LogisticsPartner } from 'src/app/admin/logistics-partners/entities/logistics-partner.entity';
import { Timestamp } from '../../../database/timestamp.entity';
import { OrderType } from '../../../types/order';
@Entity()
export class Order extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Transaction, (transaction) => transaction.orders, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'order_transaction' })
  transactions: Transaction[];

  @ManyToOne(() => Cart, (cart) => cart.orders, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @ManyToOne(() => Product, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'seller_id' })
  sellerId: string;

  @Column({ type: 'numeric' })
  quantity: number;

  @Column({ type: 'enum', enum: OrderType, default: OrderType.PERSONAL })
  type: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({
    name: 'shipping_details',
    type: 'simple-json',
    default: null,
    nullable: true,
  })
  shippingDetails: {
    shippingFee: number;
    shippingAddress: {
      state: string;
      LGA: string;
      address: string;
    };
  } | null;

  @Column({
    name: 'polymailer_details',
    type: 'simple-json',
    default: null,
    nullable: true,
  })
  polymailerDetails: {
    from: string;
    to: string;
    content: string;
  } | null;

  @Column({
    name: 'delivery_fee',
    nullable: true,
    default: 0,
    type: 'decimal',
    precision: 10,
  })
  deliveryFee: number | null;

  @Column({ nullable: true })
  coupon: string | null;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: string;

  @ManyToOne(() => PrintingPartner, (partner) => partner.orders, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'printing_partner_id' })
  printingPartner: PrintingPartner;

  @ManyToOne(() => LogisticsPartner, (logistics) => logistics.orders, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'logistics_partner_id' })
  logisticsPartner: LogisticsPartner;

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
}
