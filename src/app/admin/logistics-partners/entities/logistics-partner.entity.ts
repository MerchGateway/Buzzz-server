import { User } from 'src/app/users/entities/user.entity';
import { Status } from 'src/types/status';
import { Entity, OneToMany, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from 'src/app/order/entities/order.entity';
import { Timestamp } from '../../../../database/timestamp.entity';
@Entity()
export class LogisticsPartner extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  name: string;

  @OneToMany(() => User, (user) => user.logisticsPartner, {
    cascade: true,
  })
  administrators: User[];

  @OneToMany(() => Order, (order) => order.logisticsPartner, { eager: true })
  orders: Order[];

  @Column({ type: 'simple-json' })
  address: {
    address: string;
    state: string;
    LGA: string;
    city: string;
  };

  @Column({ type: 'enum', enum: Status, default: Status.ENABLED })
  status: Status;
}
