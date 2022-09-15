import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Status as orderStatus } from '../../../types/order';
import connection from 'src/app/payment/paystack/utils/connection';
import { Status } from 'src/types/transaction';
import { Order } from 'src/app/order/entities/order.entity';
import { AxiosInstance } from 'axios';

@Entity('transaction')
export class Transaction extends BaseEntity {
  axiosConnection: AxiosInstance;
  construnctor() {
    this.axiosConnection = connection();
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinColumn({ name: 'client_id' })
  user: User;
  @Column({ type: 'varchar', unique: true })
  reference: string;

  @Column({ type: 'varchar', nullable: true })
  fee: string;

  @Column({ type: 'numeric', nullable: true })
  amount: number;

  @Column({ type: 'varchar', nullable: true })
  currency: string;

  @Column({ type: 'varchar', nullable: true })
  message: string;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: string;

  @OneToMany(() => Order, (order) => order.transaction)
  orders: Order[];

  @CreateDateColumn()
  created_at: Date;

  @Column({
    type: 'enum',
    enum: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
  })
  channel: string;

  @UpdateDateColumn()
  updated_at: Date;

  public async verifyTransaction() {
    console.log('transaction method started');
    // create connection instance of axios
    this.axiosConnection = connection();

    // create conection route and fire route
    await this.axiosConnection
      .get(`/verify/${this.reference}`)
      .then((res: any) => {
        console.log('na response be this o', res);
        if (
          res.data &&
          res.data.status === 'success' &&
          res.message === 'Verification successful'
        ) {
          this.fee = res.data.fees;
          this.currency = res.data.currency;
          this.channel = res.data.channel;
          this.amount = res.data.amount;
          this.message = 'Transaction successful';
          this.status = Status.SUCCESS;

          // set the status of order to paid on successful payment verification
          this.orders.forEach(async (order) => {
            await order.updateStatus(orderStatus.PAID);
            await order.save();
          });
        } else {
          this.fee = res.data.fees;
          this.currency = res.data.currency;
          this.channel = res.data.channel;
          this.amount = res.data.amount;
          this.status = Status.FAILED;
          this.message = 'Transaction could not be verified';
          this.orders.forEach(async (order) => {
            await order.updateStatus(orderStatus.CANCELLED);
            await order.save();
          });
        }
      })
      .catch((err: any) => {
        this.status = Status.FAILED;
        this.message = err.message;
        this.orders.forEach(async (order) => {
          await order.updateStatus(orderStatus.CANCELLED);
          await order.save();
        });
      });
  }
}
