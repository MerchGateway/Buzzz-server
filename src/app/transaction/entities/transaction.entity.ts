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
import { ConfigService } from '@nestjs/config';
import { Status } from 'src/types/transaction';
import { Order } from 'src/app/order/entities/order.entity';

@Entity('transaction')
export class Transaction extends BaseEntity {
  constructor(private configService: ConfigService) {
    super();
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'client_id' })
  user: User;
  @Column({ type: 'varchar' })
  reference: string;

  @Column({ type: 'varchar' })
  fee: string;

  @Column({ type: 'numeric' })
  amount: number;

  @Column({ type: 'varchar', default: 'USD' })
  currency: string;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: string;

  @OneToMany(() => Order, (order) => order.transaction)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
  })
  channel: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  private async verifyTransaction() {
    fetch(`${this.configService.get('paystack.verifyUrl')}/${this.reference}`, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${this.configService.get('paystack.secret')}`,
      }),
    })
      .then((res) => {
        const jsonResponse: any = res.json();
        console.log(jsonResponse);
        if (
          jsonResponse.data &&
          jsonResponse.data.status === 'success' &&
          jsonResponse.message === 'Verification successful'
        ) {
          this.status = Status.SUCCESS;
        } else {
          this.fee = jsonResponse.data.fee;
          this.currency = jsonResponse.data.currency;
          this.channel = jsonResponse.data.channel;
          this.amount = jsonResponse.data.amount;
          this.status = Status.FAILED;
        }
      })
      .catch((err) => {
        console.log(err);
        this.status = Status.FAILED;
      });
  }
}
