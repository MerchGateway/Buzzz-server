import {
	ConflictException,
	ForbiddenException,
	HttpException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { AxiosInstance } from 'axios';

import { User } from 'src/app/users/entities/user.entity';
import { config as envConfig } from 'dotenv';
import { PaymentReceipt } from '../entities/payment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import connection from 'src/app/payment/paystack/utils/connection';
import { CartService } from 'src/app/cart/cart.service';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { Cart } from 'src/app/cart/entities/cart.entity';
import { TransactionCurrency } from '../../../types/transaction';
import { CreatePayRefDto } from '../dto/create-pay-ref-dto';
import { Gift } from 'src/app/gifting/entities/gift.entity';
import { DeliveryCostService } from 'src/app/delivery-cost/delivery-cost.service';
import { NigerianStates } from 'src/types/States';

envConfig();

@Injectable()
export class PaystackBrokerService {
	axiosConnection: AxiosInstance;

	constructor(
		@InjectRepository(PaymentReceipt)
		private readonly paymentRepository: Repository<PaymentReceipt>,
		private readonly cartService: CartService,
		private readonly transactionService: TransactionService,
		private readonly deliveryCostService: DeliveryCostService
	) {
		this.axiosConnection = connection();
	}
	// Create payment Ref (initialize transaction)
	// Create payment Ref (initialize transaction)
	private async initializeTransaction(
		user: User,
		payload: CreatePayRefDto,
		gift: Gift = null
	) {
		// initialize transaction
		return await this.axiosConnection
			.post('/transaction/initialize', payload)
			.then(async (res) => {
				// create transaction on payment initalize
				if (gift) {
					await this.transactionService.createTransaction(
						res.data.data.reference,
						user,
						res.data.message,
						gift
					);
				} else {
					await this.transactionService.createTransaction(
						res.data.data.reference,
						user,
						res.data.message
					);
				}

				return res.data.data;
			})
			.catch((err) => {
				throw new HttpException(err.message, err.statusCode || 500);
			});
	}
	public async createPayRefForGift(
		user: User,
		gift: Gift
	): Promise<{
		authorization_url: string;
		access_code: string;
		reference: string;
	}> {
		const payload = {
			email: user.email,
			amount: 0,
		};
		payload.amount = gift.quantity * gift.product.price * 100;
		return await this.initializeTransaction(user, payload, gift);
	}

	public async createPayRefForCart(user: User): Promise<{
		authorization_url: string;
		access_code: string;
		reference: string;
	}> {
		if (!user.shippingAddress.state) {
			throw new ForbiddenException('Please provide a shipping address');
		}

		// create payload values to be sent to paystack
		const payload = {
			email: user.email,
			amount: 0,
		};

		// get all cart items
		const cartItems: Cart[] = await this.cartService.getCartItems(user);
		// console.log(cartItems.length);
		if (cartItems.length === 0) {
			throw new NotFoundException(
				'You must have item(s) in your cart before creating a payment'
			);
		}

		//compute the total price of all cart items

		await Promise.all(
			cartItems.map((item) => {
				payload.amount += item.total;
			})
		);

		// add the delivery fee to the total price if doorstep delivery
		if (cartItems[0].deliveryMethod === 'DOORSTEP') {
			const deliveryCost =
				await this.deliveryCostService.findDeliveryCostByState(
					user.shippingAddress.state as NigerianStates
				);

			payload.amount += deliveryCost.cost;
		}

		// set payload amount to the smallest decimal
		payload.amount = payload.amount * 100;
		// initialize transaction
		return await this.initializeTransaction(user, payload);
	}

	public async createRefund(transaction: string) {
		const refund = await this.axiosConnection.post('/refund', { transaction });
		return { data: refund.data };
	}

	public async getBankList() {
		const response = await this.axiosConnection.get('/bank');
		return response.data.data as {
			id: string;
			name: string;
			code: string;
			slug: string;
		}[];
	}

	public async resolveAccountNumber(accountNumber: string, bankCode: string) {
		const response = await this.axiosConnection.get(
			`/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`
		);
		const res = response.data.data;

		return {
			accountName: res.account_name as string,
			accountNumber: res.account_number as string,
			bankId: res.bank_id as number,
		};
	}

	public async createTransferRecipient(
		name: string,
		accountNumber: string,
		bankCode: string
	) {
		return this.axiosConnection.post('/transferrecipient', {
			type: 'nuban',
			name,
			account_number: accountNumber,
			bank_code: bankCode,
			currency: 'NGN',
		});
	}

	public async initiateTransfer(
		amount: number,
		recipient: string,
		reason: string,
		reference: string
	) {
		const response = await this.axiosConnection.post('/transfer', {
			source: 'balance',
			amount,
			recipient,
			reason,
			reference,
		});
		return (await response.data.data.transfer_code) as string;
	}

	public async verifyPaymentTransaction(reference: string) {
		const response = await this.axiosConnection.get(
			`/transaction/verify/${reference}`
		);
		const data = response.data.data;

		return {
			status: data.status as string,
			amount: data.amount as number,
			currency: data.currency as TransactionCurrency,
			message: data.message as string,
		};
	}

	public async verifyWithdrawalTransaction(reference: string) {
		const response = await this.axiosConnection.get(
			`/transfer/verify/${reference}`
		);
		const data = response.data.data;

		return {
			status: data.status as string,
			amount: data.amount as number,
			currency: data.currency as TransactionCurrency,
			message: '',
		};
	}

	private async handleGetPayRecord(id: string) {
		const record = await this.paymentRepository.findOne({ where: { id } });
		if (!record) {
			throw new NotFoundException(`payment record for ${id} not found`);
		}
		return record;
	}

	// checks if the pay ref exists in  the database already
	private async checkIfPayRefExists(ref: string) {
		const payRef = await this.paymentRepository.findOne({
			where: { reference: ref },
		});
		if (payRef) {
			throw new ConflictException(
				'A record is already associated with this payment reference'
			);
		}
		return;
	}

	public async handleRemovePaymentRecord(recordId: string) {
		const record = await this.handleGetPayRecord(recordId);

		await this.paymentRepository.delete(recordId);

		return record;
	}

	public async handleGetARecord(id: string) {
		const record = await this.paymentRepository.findOne({
			where: {
				id,
			},
			relations: {
				product: true,
			},
		});

		if (!record) {
			throw new NotFoundException('no record found');
		}

		return record;
	}
}
