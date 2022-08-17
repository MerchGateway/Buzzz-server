import * as bcrypt from 'bcrypt';
import { Role } from 'src/types/general';
import { IdentityProvider } from 'src/types/user';

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { Cart } from '../../cart/entities/cart.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'identity_provider',
    nullable: true,
    select: false,
  })
  identityProvider: IdentityProvider | null;

  @Column({
    name: 'identity_provider_id',
    unique: true,
    nullable: true,
    select: false,
  })
  identityProviderId: string | null;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ select: false, nullable: true })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(
    () => Order,
    (order) => {
      order.owner;
    },
  )
  orders: Order[];

  @OneToMany(
    () => Cart,
    (cart) => {
      cart.owner;
    },
  )
  cart: Cart[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  public async matchPassword(enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
  }
}
