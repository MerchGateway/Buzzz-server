import { Stats } from 'fs';
import { Order } from 'src/app/order/entities/order.entity';
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
  JoinColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('printing-partner')
export class PrintingPartner extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'partner-name',
    unique: true,
    transformer: { to: (value) => value.trim(), from: (value) => value },
  })
  name: string;

  @OneToMany(() => User, (user) => user.printing_partner, { cascade: true })
  administrators: User[];

  @OneToMany(() => Order, (order) => order.printing_partner, { eager: true,cascade:true})
  orders: Order[];

  @Column({ type: 'simple-json' })
  partner_address: {
    address: string;
    state: string;
    LGA: string;
    city: string;
  };

  @Column({ type: 'enum', enum: Status, default: Status.ENABLED })
  status: Status;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
