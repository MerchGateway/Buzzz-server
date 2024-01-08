import { Order } from 'src/app/order/entities/order.entity';
import { User } from 'src/app/users/entities/user.entity';
import { Status } from 'src/types/status';
import { Entity, OneToMany, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamp } from '../../../../database/timestamp.entity';

@Entity()
export class PrintingPartner extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    transformer: { to: (value) => value.trim(), from: (value) => value },
  })
  name: string;

  @OneToMany(() => User, (user) => user.printingPartner, { cascade: true })
  administrators: User[];

  @OneToMany(() => Order, (order) => order.printingPartner, {
    eager: true,
    cascade: true,
  })
  orders: Order[];

  @Column({ type: 'simple-json' })
  address: {
    address: string;
    state: string;
    LGA: string;
    city: string;
    latitude: number;
    longitude: number;
  };

  @Column({ type: 'enum', enum: Status, default: Status.ENABLED })
  status: Status;
}
