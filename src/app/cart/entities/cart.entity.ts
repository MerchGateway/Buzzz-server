import {
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
	Column,
	OneToMany,
	BeforeInsert,
	BeforeUpdate,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Order } from '../../order/entities/order.entity';
import { Product } from '../../product/entities/product.entity';
import { Size } from '../../../types/size';
import { Timestamp } from '../../../database/timestamp.entity';
import { Color } from 'src/types/color';
import { DeliveryMethod } from 'src/types/delivery';

@Entity()
export class Cart extends Timestamp {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => User, {
		cascade: true,
	})
	@JoinColumn({ name: 'user_id' })
	user: User;

	@ManyToOne(() => Product, {
		cascade: true,
		eager: true,
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'product_id' })
	product: Product;

	@OneToMany(() => Order, (order) => order.cart)
	orders: Order[];

	@Column({
		type: 'integer',
		transformer: { to: (value) => Math.abs(value), from: (value) => value },
	})
	quantity: number;

	@Column({ type: 'text', nullable: true })
	creatorInstructions?: string;

	@Column({
		type: 'enum',
		enum: DeliveryMethod,
		default: DeliveryMethod.DOORSTEP,
	})
	deliveryMethod: DeliveryMethod;

	@Column({ type: 'integer' })
	total: number;

	@Column({ type: 'enum', enum: Size, default: Size.M })
	size: Size;

	@Column({
		type: 'enum',
		enum: Color,
		default: Color['#ffffff'],
	})
	color: string;

	@BeforeInsert()
	@BeforeUpdate()
	private async calculateTotal(): Promise<void> {
		this.total = this.product.price * Math.abs(this.quantity);
	}

	@BeforeInsert()
	@BeforeUpdate()
	private async addColor(): Promise<void> {
		!this.color &&
			this.product &&
			(this.color = this.product.design.designData.background);
	}
}
