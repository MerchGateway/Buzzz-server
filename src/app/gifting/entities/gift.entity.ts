import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToOne,
} from 'typeorm';

import { uniqueUsernameGenerator } from 'unique-username-generator';
import { Timestamp } from '../../../database/timestamp.entity';
import { Product } from 'src/app/product/entities/product.entity';
import { Order } from 'src/app/order/entities/order.entity';
@Entity()
export class Gift extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  giftCode: string;

  @ManyToOne(() => Product, {
    cascade: true,
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToOne(() => Order, {
    cascade: true,
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ type: 'simple-array' })
  recievers: string[];

  @BeforeInsert()
  private generateGiftCode() {
    if (!this.giftCode) {
      const giftCode = uniqueUsernameGenerator({
        dictionaries: [['buzzz'], ['gifting']],
        length: 6,
        style: 'upperCase',
        randomDigits: 2,
      });
      this.giftCode = giftCode;
    }
  }
}
