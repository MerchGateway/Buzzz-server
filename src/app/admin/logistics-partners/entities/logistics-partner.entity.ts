import { Product } from 'src/app/product/product.entity';
import { Transaction } from 'src/app/transaction/entities/transaction.entity';
import { User } from 'src/app/users/entities/user.entity';
import { Status } from 'src/types/status';
import {
  BaseEntity,
  Entity,
  OneToMany,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Order } from 'src/app/order/entities/order.entity';
@Entity('logistics-partner')
export class LogisticsPartner extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'partner-name',
    unique: true,
  })
  name: string;

  @OneToMany(() => User, (user) => user.logistics_partner, { eager: true })
  administrators: User[];

  @OneToMany(() => Order, (order) => order.logistics_partner, { eager: true })
  orders: Order[];

  @Column({ type: 'simple-json' })
  partner_address: {
    street_number: number;
    state: string;
    LGA: string;
    zipcode: number;
  };

  @Column({ type: 'enum', enum: Status, default: Status.ENABLED })
  status: Status;


  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
