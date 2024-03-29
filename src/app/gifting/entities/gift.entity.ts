import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToOne,
} from "typeorm";
import * as voucherCode from "voucher-code-generator";
import { Timestamp } from "../../../database/timestamp.entity";
import { Product } from "src/app/product/entities/product.entity";
import { Order } from "src/app/order/entities/order.entity";
@Entity()
export class Gift extends Timestamp {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  giftCode: string;

  @ManyToOne(() => Product, {
    cascade: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column()
  note: string;

  @Column({ type: "integer" })
  quantity: number;

  @OneToOne(() => Order, {
    cascade: true,
  })
  @JoinColumn({ name: "order_id" })
  order: Order;

  @Column({ type: "simple-array" })
  recievers: string[];

  @BeforeInsert()
  private generateGiftCode() {
    if (!this.giftCode) {
      //Generate giftncode here
      const giftCode = voucherCode.generate({
        prefix: "buzzz-",
        length: 6,
      });

      this.giftCode = giftCode[0].toUpperCase();
    }
  }
}
