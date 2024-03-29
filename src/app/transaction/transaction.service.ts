import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
  forwardRef,
  HttpException,
} from "@nestjs/common";
import { IPaginationOptions, Pagination } from "nestjs-typeorm-paginate";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsUtils, Repository } from "typeorm";
import { Transaction } from "./entities/transaction.entity";
import { OrderType, Status as orderStatus } from "../../types/order";
import { User } from "../users/entities/user.entity";
import { OrderService } from "../order/order.service";
import moment from "moment";
import { AxiosInstance } from "axios";
import {
  DEFAULT_POLY_MAILER_CONTENT,
  PAYSTACK_SUCCESS_STATUS,
} from "../../constant";
import { Order } from "../order/entities/order.entity";
import { PolymailerContent } from "../order/entities/polymailer-content.entity";
import {
  TransactionChannel,
  TransactionMethod,
  TransactionStatus,
} from "src/types/transaction";
import { CustomersService } from "../customers/customers.service";
import { ProductService } from "../product/product.service";
import { paginate } from "nestjs-typeorm-paginate";
import { FeeService } from "../fee/fee.service";
import { Request } from "express";
import { SuccessResponse } from "../../utils/response";
import * as crypto from "crypto";
import { ConfigService } from "@nestjs/config";
import {
  PaystackChargeEventData,
  PaystackEvent,
  TransferEventData,
} from "../../types/paystack";
import { MailService } from "../../mail/mail.service";
import { PaystackBrokerService } from "../payment/paystack/paystack.service";
import { Gift } from "../gifting/entities/gift.entity";
import { GiftService } from "../gifting/gift.service";
import { AdminService } from "../admin/admin.service";

@Injectable()
export class TransactionService {
  axiosConnection: AxiosInstance;
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(PolymailerContent)
    private readonly polyMailerContentRepository: Repository<PolymailerContent>,
    private readonly orderService: OrderService,
    private readonly customerService: CustomersService,
    private readonly adminService: AdminService,
    private readonly productService: ProductService,
    @Inject(forwardRef(() => GiftService))
    private readonly giftService: GiftService,
    private readonly feeService: FeeService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    @Inject(forwardRef(() => PaystackBrokerService))
    private readonly paystackBrokerService: PaystackBrokerService
  ) {}

  public async createGiftTransaction(user: User, orders: Order[], gift: Gift) {
    const fee = await this.feeService.getLatest();
    const transaction = this.transactionRepository.create({
      status: TransactionStatus.SUCCESS,
      type: OrderType.GIFT,
      amount: 0,
      wallet: user.wallet,
      reference: gift.order.transactions[0].reference,
      fee,
      orders,
      feeAmount: 0,
      method: TransactionMethod.CREDIT,
      isHidden: true,
    });
    await this.transactionRepository.save(transaction);
  }
  public async createTransaction(
    reference: string,
    buyer: User,
    message: string,
    gift?: Gift
  ) {
    //create order
    let orders: Order[];
    if (gift) {
      orders = await this.orderService.createOrder(buyer, null, gift);
      console.log(orders);
    } else {
      orders = await this.orderService.createOrder(buyer, {
        shippingAddress: {
          ...buyer.shippingAddress,
          latitude: null,
          longitude: null,
        },
      });
    }

    const ownerOrders = orders.filter((order) => order.sellerId === buyer.id);
    const resellerOrders = orders.filter(
      (order) => order.sellerId !== buyer.id
    );

    const totalOwnerCost = ownerOrders.reduce((acc, order) => {
      return acc + parseFloat(order.total.toString());
    }, 0);
    const totalResellerCost = resellerOrders.reduce((acc, order) => {
      return acc + parseFloat(order.total.toString());
    }, 0);

    const fee = await this.feeService.getLatest();

    let totalFeeAmount = 0;
    resellerOrders.map((order: Order) => {
      totalFeeAmount += order.quantity * fee.reseller;
    });

    const transactions: Transaction[] = [];

    const orderType = gift ? OrderType.PAYFORWARD : OrderType.PERSONAL;
    // buying your own product
    if (ownerOrders.length > 0) {
      // create a hidden credit with the same amount for the buyer to enable debiting without encountering negative values
      const ownerCreditTransaction = this.transactionRepository.create({
        reference,
        wallet: buyer.wallet,
        message,
        orders,
        type: orderType,
        amount: totalOwnerCost,
        fee,
        feeAmount: totalOwnerCost,
        method: TransactionMethod.CREDIT,
        isHidden: true,
      });
      // debit the buyer the same amount as the cost of the product and amount of hidden credit
      const ownerDebitTransaction = this.transactionRepository.create({
        reference,
        wallet: buyer.wallet,
        message,
        orders,
        type: orderType,
        amount: totalOwnerCost,
        fee,
        feeAmount: totalOwnerCost,
        method: TransactionMethod.DEBIT,
      });
      transactions.push(ownerCreditTransaction, ownerDebitTransaction);
    }

    if (resellerOrders.length > 0) {
      // credit the owner of the product
      const resellerCreditTransaction = this.transactionRepository.create({
        reference,
        wallet: resellerOrders[0].product.seller.wallet,
        message,
        orders,
        type: orderType,
        amount: totalResellerCost,
        fee,
        feeAmount: totalFeeAmount,
        method: TransactionMethod.CREDIT,
      });
      // create a hidden credit with the same amount for the buyer to enable debiting without encountering negative values
      const ownerCreditTransaction = this.transactionRepository.create({
        reference,
        wallet: buyer.wallet,
        message,
        orders,
        type: orderType,
        amount: totalResellerCost,
        fee,
        method: TransactionMethod.CREDIT,
        feeAmount: totalResellerCost,
        isHidden: true,
      });
      // debit the buyer the same amount as the cost of the product and amount of hidden credit
      const ownerDebitTransaction = this.transactionRepository.create({
        reference,
        wallet: buyer.wallet,
        message,
        orders,
        amount: totalResellerCost,
        fee,
        feeAmount: totalResellerCost,
        method: TransactionMethod.DEBIT,
      });
      transactions.push(
        resellerCreditTransaction,
        ownerCreditTransaction,
        ownerDebitTransaction
      );
    }

    return await this.transactionRepository.save(transactions);
  }

  public async getTransactionsForAuthUser(
    user: User,
    { limit, page, route }: IPaginationOptions
  ): Promise<Pagination<Transaction>> {
    const qb = this.transactionRepository.createQueryBuilder("transaction");
    FindOptionsUtils.joinEagerRelations(
      qb,
      qb.alias,
      this.transactionRepository.metadata
    );
    // select nested relations
    qb.leftJoinAndSelect("transaction.wallet", "wallet");
    qb.leftJoinAndSelect("transaction.orders", "orders");
    qb.leftJoinAndSelect("orders.product", "product");
    qb.orderBy("transaction.created_at", "DESC");
    qb.where("transaction.wallet_id = :walletId", { walletId: user.wallet.id });
    qb.andWhere("transaction.is_hidden = :isHidden", { isHidden: false });

    return paginate<Transaction>(qb, { limit, page, route });
  }
  public async getTransactions({
    limit,
    page,
    route,
  }: IPaginationOptions): Promise<Pagination<Transaction>> {
    const qb = this.transactionRepository.createQueryBuilder("transaction");
    qb.orderBy("transaction.created_at", "DESC");
    return paginate<Transaction>(qb, { limit, page, route });
  }

  private async getATransaction(transactionId: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({
      where: { id: transactionId },
      // TODO: select only necessary fields
      relations: { orders: true },
    });

    if (!transaction) {
      throw new NotFoundException(
        `Transaction with id ${transactionId} not found`
      );
    }
    return transaction;
  }

  private async verifyPaymentTransaction(
    paystackEventData: PaystackChargeEventData
  ) {
    const { reference, status, currency, channel, amount, message } =
      paystackEventData;

    const transactionsToVerify = await this.transactionRepository.find({
      where: { reference },
      relations: [
        "orders",
        "orders.user",
        "orders.product",
        "orders.product.seller",
        "wallet",
        "wallet.user",
      ],
    });

    if (transactionsToVerify.length == 0) {
      // don't throw error here to avoid paystack retrying the webhook
      return;
    }

    if (status === PAYSTACK_SUCCESS_STATUS) {
      transactionsToVerify.forEach((transaction) => {
        transaction.currency = currency;
        transaction.channel = channel.toUpperCase() as TransactionChannel;
        transaction.amount = parseFloat((amount / 100).toFixed(2));
        transaction.message = "Transaction successful";
        transaction.status = TransactionStatus.SUCCESS;
      });

      // set the status of order to paid on successful payment verification
      await Promise.all(
        transactionsToVerify[0].orders.map(async (order) => {
          await order.updateStatus(orderStatus.PAID);

          // fetch polymailerContents
          const polymailerContents: PolymailerContent[] =
            await this.polyMailerContentRepository.find();

          // get a random polymailer content
          const random = Math.floor(Math.random() * polymailerContents.length);

          // set polymailer details
          order.polymailerDetails = {
            to: order.user.firstName,
            from: order.product.seller.firstName,
            content: polymailerContents[0]
              ? polymailerContents[random].content
              : DEFAULT_POLY_MAILER_CONTENT,
          };

          await order.save();
        })
      );

      // TODO: map through the orders and do this for all product in the order
      const transactions = await this.transactionRepository.find({
        where: { reference },
        relations: [
          "orders",
          "orders.product",
          "orders.product.seller",
          "wallet",
          "wallet.user",
        ],
      });

      const product = transactions[0].orders[0].product;
      // update purchase state of product  after successful payment verification
      product.purchased = true;
      await product.save();

      const totalOrderQuantity = transactions[0].orders.reduce((acc, order) => {
        return acc + parseInt(order.quantity.toString());
      }, 0);

      // find a transaction where the buyer is not also the seller:
      // (in the case where a user buys their own merch)
      const nonSellerBuyerTransaction = transactions.find(
        (transaction) => transaction.wallet.user.id !== product.seller.id
      );

      let buyer: User;

      if (!nonSellerBuyerTransaction) {
        // if the buyer is also the seller, then the buyer is the product seller
        buyer = product.seller;
      } else {
        // if the buyer is not also the seller, then the buyer is the user in the nonSellerBuyerTransaction
        buyer = nonSellerBuyerTransaction.wallet.user;
      }

      const notBuyingFromOneself = product.seller.id !== buyer.id;

      if (notBuyingFromOneself) {
        // add user to customer list only if the buyer is not also the seller
        await this.customerService.create(product.seller.id, buyer);

        // send a confirmation mail to the seller only if the buyer is not also the seller
        this.mailService.sendSellerOrderConfirmation(product.seller, {
          ...transactions[0].orders[0],
          quantity: totalOrderQuantity,
        } as Order);
      }

      this.mailService.sendBuyerOrderConfirmation(buyer, {
        ...transactions[0].orders[0],
        quantity: totalOrderQuantity,
      } as Order);

      if (transactions[0].orders[0].type === OrderType.PAYFORWARD) {
        // send gift creation message to all beneficiaries
        const gift = await this.giftService.fetchSingleGift({
          order: { id: transactions[0].orders[0].id },
        });
        if (!gift) {
          return;
        }
        const giftPreviewLink = `${this.configService.get(
          "clientUrl"
        )}/preview/${gift.product.id}`;
        await this.mailService.sendGiftNotificationToBeneficiaries({
          user: transactions[0].orders[0].user.email,
          gift,
          giftPreviewLink,
        });
      } else {
        await this.mailService.sendAdminNewOrderNotice({
          ...transactions[0].orders[0],
          quantity: totalOrderQuantity,
        } as Order);
      }
    } else {
      transactionsToVerify.forEach((transaction) => {
        transaction.currency = currency;
        transaction.channel = channel.toUpperCase() as TransactionChannel;
        transaction.amount = parseFloat((amount / 100).toFixed(2));
        transaction.status = TransactionStatus.FAILED;
        transaction.message = message || "Transaction verification failed";
      });
      await Promise.all(
        transactionsToVerify[0].orders.map(async (order) => {
          await order.updateStatus(orderStatus.CANCELLED);
          await order.save();
        })
      );
    }

    await this.transactionRepository.save(transactionsToVerify);
  }

  private async verifyWithdrawalTransaction(
    paystackEventData: TransferEventData
  ) {
    const { status, reference, amount, currency } = paystackEventData;

    const transaction = await this.transactionRepository.findOne({
      where: { reference },
    });

    if (!transaction) {
      // don't throw error here to avoid paystack retrying the webhook
      return;
    }

    if (status === PAYSTACK_SUCCESS_STATUS) {
      transaction.status = TransactionStatus.SUCCESS;
      transaction.amount = parseFloat((amount / 100).toFixed(2));
      transaction.currency = currency;
      transaction.message = "Withdrawal successful";
    } else {
      transaction.status = TransactionStatus.FAILED;
      transaction.message = "Withdrawal failed";
    }

    await this.transactionRepository.save(transaction);
  }

  public async deleteTransaction(reference: string) {
    const isTransaction = await this.transactionRepository.findOneBy({
      reference,
    });

    if (!isTransaction) {
      throw new NotFoundException(
        `Transaction with reference ${reference} does not exist`
      );
    }

    await this.transactionRepository.delete({ reference });
    return isTransaction;
  }

  public async salesAnalytics(
    query: string
  ): Promise<Transaction[] | undefined> {
    const Moment = moment();
    let report: Transaction[];
    if (query === "current-week") {
      const start = Moment.startOf("week").format("YYYY-MM-DD");

      const end = Moment.endOf("week").format("YYYY-MM-DD");

      report = await this.transactionRepository
        .createQueryBuilder("transaction")
        .select("SUM(transaction.amount)", "sum")
        .addSelect("WEEKDAY(transaction.updated_at)", "week-day")
        .where("transaction.status = :status", {
          status: TransactionStatus.SUCCESS,
        })
        .andWhere(`transaction.updated_at BETWEEN '${start}' AND '${end}'`)
        .groupBy("WEEKDAY(transaction.updated_at)")
        .orderBy("WEEKDAY(transaction.updated_at)")
        .getRawMany();
    } else if (query === "current-month") {
      const start = Moment.startOf("month").format("YYYY-MM-DD");

      const end = Moment.endOf("month").format("YYYY-MM-DD");

      report = await this.transactionRepository
        .createQueryBuilder("transaction")
        .select("SUM(transaction.amount)", "sum")
        .addSelect("WEEKDAY(transaction.updated_at)", "week-day")
        .where("transaction.status = :status", {
          status: TransactionStatus.SUCCESS,
        })
        .andWhere(`transaction.updated_at BETWEEN '${start}' AND '${end}'`)
        .groupBy("WEEKDAY(transaction.updated_at)")
        .orderBy("WEEKDAY(transaction.updated_at)")
        .getRawMany();
    } else {
      const start = Moment.startOf("year").format("YYYY-MM-DD");

      const end = Moment.endOf("year").format("YYYY-MM-DD");

      report = await this.transactionRepository
        .createQueryBuilder("transaction")
        .select("SUM(transaction.amount)", "sum")
        .addSelect("EXTRACT (MONTH FROM transaction.updated_at)", "month")
        .where("transaction.status = :status", {
          status: TransactionStatus.SUCCESS,
        })
        .andWhere(`transaction.updated_at BETWEEN '${start}' AND '${end}'`)
        .groupBy("EXTRACT (MONTH FROM transaction.updated_at)")
        .orderBy("EXTRACT (MONTH FROM transaction.updated_at)")
        .getRawMany();
    }
    return report;
  }

  async getBalanceForWalletId(walletId: string) {
    const creditsResult = await this.transactionRepository
      .createQueryBuilder("transaction")
      .select("SUM(transaction.amount - transaction.feeAmount)", "sum")
      .where("transaction.wallet_id = :walletId", { walletId })
      .andWhere("transaction.method = :method", {
        method: TransactionMethod.CREDIT,
      })
      .andWhere("transaction.status = :status", {
        status: TransactionStatus.SUCCESS,
      })
      .getRawOne();

    const paymentDebitsResult = await this.transactionRepository
      .createQueryBuilder("transaction")
      .select(`SUM(transaction.amount - transaction.feeAmount)`, "sum")
      .where("transaction.wallet_id = :walletId", { walletId })
      .andWhere("transaction.method = :method", {
        method: TransactionMethod.DEBIT,
      })
      .andWhere("transaction.channel != :channel", {
        channel: TransactionChannel.BANK_TRANSFER,
      })
      .andWhere("transaction.status = :status", {
        status: TransactionStatus.SUCCESS,
      })
      .getRawOne();

    const withDrawalDebitsResult = await this.transactionRepository
      .createQueryBuilder("transaction")
      .select(`SUM(transaction.amount)`, "sum")
      .where("transaction.wallet_id = :walletId", { walletId })
      .andWhere("transaction.method = :method", {
        method: TransactionMethod.DEBIT,
      })
      .andWhere("transaction.channel = :channel", {
        channel: TransactionChannel.BANK_TRANSFER,
      })
      .andWhere("transaction.status IN (:...status)", {
        status: [TransactionStatus.SUCCESS, TransactionStatus.PENDING],
      })
      .getRawOne();

    const availableBalance =
      parseFloat(creditsResult.sum || 0) -
      (parseFloat(paymentDebitsResult.sum || 0) +
        parseFloat(withDrawalDebitsResult.sum || 0));

    return availableBalance;
  }

  handleWebhook(req: Request) {
    const paystackSecretKey = this.configService.get<string>("paystack.secret");

    const hash = crypto
      .createHmac("sha512", paystackSecretKey)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (hash !== req.headers["x-paystack-signature"]) {
      throw new BadRequestException("Invalid signature");
    }

    switch (req.body.event) {
      case PaystackEvent.CHARGE_SUCCESS:
        this.verifyPaymentTransaction(req.body.data);
        break;
      case PaystackEvent.TRANSFER_SUCCESS:
      case PaystackEvent.TRANSFER_FAILED:
      case PaystackEvent.TRANSFER_REVERSED:
        this.verifyWithdrawalTransaction(req.body.data);
        break;
      default:
        this.verifyPaymentTransaction(req.body.data);
        break;
    }

    return new SuccessResponse({}, "Webhook received successfully");
  }

  async revalidateTransaction(transactionId: string) {
    let transaction = await this.transactionRepository.findOne({
      where: { id: transactionId },
      relations: [
        "orders",
        "orders.user",
        "orders.product",
        "orders.product.seller",
      ],
    });

    if (!transaction) {
      throw new NotFoundException(
        `Transaction with id ${transactionId} does not exist`
      );
    }

    try {
      let data;

      if (transaction.channel === TransactionChannel.BANK_TRANSFER) {
        data = await this.paystackBrokerService.verifyWithdrawalTransaction(
          transaction.reference
        );
      } else {
        data = await this.paystackBrokerService.verifyPaymentTransaction(
          transaction.reference
        );
      }

      if (data.status === PAYSTACK_SUCCESS_STATUS) {
        transaction.status = TransactionStatus.SUCCESS;
        transaction.amount = parseFloat((data.amount / 100).toFixed(2));
        transaction.currency = data.currency;
        transaction.message = "Transaction successful";

        await Promise.all(
          transaction.orders.map(async (order) => {
            await order.updateStatus(orderStatus.PAID);
            // await this.adminService.assignOrdersAutoToClosestPartner(
            //   'Printing',
            //   order,
            // );
            // fetch polymailerContents
            const polymailerContents: PolymailerContent[] =
              await this.polyMailerContentRepository.find();

            // get a random polymailer content
            const random = Math.floor(
              Math.random() * polymailerContents.length
            );

            // set polymailer details
            order.polymailerDetails = {
              to: order.user.firstName,
              from: order.product.seller.firstName,
              content: polymailerContents[0]
                ? polymailerContents[random].content
                : DEFAULT_POLY_MAILER_CONTENT,
            };

            await order.save();
          })
        );

        const transactions = await this.transactionRepository.find({
          where: { reference: transaction.reference },
          relations: [
            "orders",
            "orders.product",
            "orders.product.seller",
            "wallet",
            "wallet.user",
          ],
        });

        const product = transactions[0].orders[0].product;

        const totalOrderQuantity = transactions[0].orders.reduce(
          (acc, order) => {
            return acc + parseInt(order.quantity.toString());
          },
          0
        );

        // find a transaction where the buyer is not also the seller:
        // (in the case where a user buys their own merch)
        const nonSellerBuyerTransaction = transactions.find(
          (transaction) => transaction.wallet.user.id !== product.seller.id
        );

        let buyer: User;

        if (!nonSellerBuyerTransaction) {
          // if the buyer is also the seller, then the buyer is the product seller
          buyer = product.seller;
        } else {
          // if the buyer is not also the seller, then the buyer is the user in the nonSellerBuyerTransaction
          buyer = nonSellerBuyerTransaction.wallet.user;
        }

        const notBuyingFromOneself = product.seller.id !== buyer.id;

        if (notBuyingFromOneself) {
          // add user to customer list only if the buyer is not also the seller
          await this.customerService.create(product.seller.id, buyer);

          // send a confirmation mail to the seller only if the buyer is not also the seller
          this.mailService.sendSellerOrderConfirmation(product.seller, {
            ...transactions[0].orders[0],
            quantity: totalOrderQuantity,
          } as Order);
        }

        this.mailService.sendBuyerOrderConfirmation(buyer, {
          ...transactions[0].orders[0],
          quantity: totalOrderQuantity,
        } as Order);
        this.mailService.sendAdminNewOrderNotice({
          ...transactions[0].orders[0],
          quantity: totalOrderQuantity,
        } as Order);
        if (transactions[0].orders[0].type === OrderType.PAYFORWARD) {
          // send gift creation message to all beneficiaries
          const gift = await this.giftService.fetchSingleGift({
            order: { id: transactions[0].orders[0].id },
          });
          if (!gift) {
            return;
          }
          const giftPreviewLink = `${this.configService.get(
            "clientUrl"
          )}/preview/${gift.product.id}`;
          await this.mailService.sendGiftNotificationToBeneficiaries({
            user: transactions[0].orders[0].user.email,
            gift,
            giftPreviewLink,
          });
        } else {
          this.mailService.sendAdminNewOrderNotice({
            ...transactions[0].orders[0],
            quantity: totalOrderQuantity,
          } as Order);
        }
      } else {
        transaction.status = TransactionStatus.FAILED;
        transaction.message = data.message || "Transaction verification failed";

        await Promise.all(
          transaction.orders.map(async (order) => {
            await order.updateStatus(orderStatus.CANCELLED);
            await order.save();
          })
        );
      }

      transaction = await this.transactionRepository.save(transaction);
    } catch (error) {
      throw new HttpException(
        error.response.data.message || error.message,
        error.response.status
      );
    }

    return new SuccessResponse(
      transaction,
      "Transaction revalidated successfully"
    );
  }
}
