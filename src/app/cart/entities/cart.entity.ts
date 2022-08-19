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
import { ProductService } from 'src/app/product/product.service';
@Entity('cart-item')
export class Cart extends BaseEntity {
  constructor(private readonly productService: ProductService) {
    super();
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'client_id' })
  owner: User;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ type: 'integer' })
  quantity: number;

  @Column({ type: 'integer' })
  total: number;

  @BeforeInsert()
  @BeforeUpdate()
  private async calculateTotal() {
    const productItem = await this.productService.handleGetAProduct(
      this.product.id,
    );
    this.total = productItem.price * this.quantity;
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
