import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsUtils, Repository } from 'typeorm';
import { Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { paginate } from 'nestjs-typeorm-paginate';
import {
  Injectable,
  HttpException,
  Inject,
  forwardRef,
  BadRequestException,
} from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { NotFoundException } from '@nestjs/common';
import { GeocoderProvider } from 'src/providers/googleGeocoder.provider';
import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import { CartService } from '../cart/cart.service';
import { OrderType, Status } from 'src/types/order';
import { Gift } from '../gifting/entities/gift.entity';
import { GOOGLE_GEOCODER } from 'src/constant';
interface OrderAnalyticsT {
  thisMonthOrder: number;
  lastTwoMonthsOrder: number;
}

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Gift)
    private readonly giftRepository: Repository<Gift>,
    @Inject(GOOGLE_GEOCODER)
    private readonly googleGeocoder: GeocoderProvider,
    @Inject(forwardRef(() => CartService))
    private readonly cartService: CartService,
  ) {}

  public async createGiftOrder(
    user: User,
    gift: Gift,
    payload: CreateOrderDto,
  ) {
    // const address = `${payload.shippingAddress.address},
    //        ${payload.shippingAddress.state},
    //        ${payload.shippingAddress.LGA}`
    // save cart items
    const order = new Order();
    order.user = user;
    order.status = Status.PAID;
    order.sellerId = gift.product.seller.id;
    order.product = gift.product;
    order.quantity = gift.recievers.length > 1 ? 1 : gift.quantity;
    order.total = 0;

    // const cordinates = await this.googleGeocoder.getLongitudeAndLatitude(
    //   address,
    // );

    // order.shippingDetails = {
    //   shippingFee: 0,
    //   shippingAddress: {
    //     ...payload.shippingAddress,
    //     latitude: cordinates[0],
    //     longitude: cordinates[1],
    //   },
    // };

    order.shippingDetails = {
      shippingFee: 0,
      shippingAddress: {
        ...payload.shippingAddress,
      },
    };
    order.type = OrderType.GIFT;
    return await this.orderRepository.save(order);
  }
  public async createOrder(user: User, payload?: CreateOrderDto, gift?: Gift) {
    let result: Order[];
    if (gift) {
      // save cart items
      let order = new Order();
      order.user = user;
      order.sellerId = gift.product.seller.id;
      order.product = gift.product;
      order.type = OrderType.PAYFORWARD;
      order.quantity = gift.quantity;
      order.total = gift.quantity * gift.product.price;
      order = await this.orderRepository.save(order);
      gift.order = order;
      await this.giftRepository.save(gift);
      result = [order];
      console.log(order);
    } else {
      const userCartItems = await this.cartService.getCartItems(user);

      // throw exception if there isn't any item in cart
      if (!userCartItems[0]) {
        throw new BadRequestException(
          'Item{s} to create order for does not exist ',
        );
      }

      result = await Promise.all(
        userCartItems.map(async (cart) => {
          const order = new Order();
          order.user = user;
          order.cart = cart;
          order.sellerId = cart.product.seller.id;
          order.product = cart.product;

          // if (payload.shippingAddress !== null) {
          //   const address = `${payload.shippingAddress.address},
          //  ${payload.shippingAddress.state},
          //  ${payload.shippingAddress.LGA}`;

          //   const cordinates =
          //     await this.googleGeocoder.getLongitudeAndLatitude(address);
          //   order.shippingDetails = {
          //     shippingFee: 0,
          //     shippingAddress: {
          //       ...payload.shippingAddress,
          //       latitude: cordinates[0],
          //       longitude: cordinates[1],
          //     },
          //   };
          // }

          // save cart items
          return await this.orderRepository.save(order);
        }),
      );
    }

    const orderIds = result.map((order) => order.id);
    result = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.product', 'product')
      .leftJoinAndSelect('product.seller', 'seller')
      .leftJoinAndSelect('seller.wallet', 'wallet')
      .where('order.id IN (:...orderIds)', { orderIds })
      .select([
        'order.id',
        'order.total',
        'order.sellerId',
        'product.id',
        'seller.id',
        'wallet.id',
        'order.quantity',
      ])
      .getMany();

    return result;
  }

  public async deleteOrder(orderId: string): Promise<Order | undefined> {
    try {
      // check if order exists
      const isOrder = await this.orderRepository.findOne({
        where: { id: orderId },
      });

      if (!isOrder) {
        throw new NotFoundException(`Order with id ${orderId} does not exist`);
      }
      await this.orderRepository.delete(orderId);

      return isOrder;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async getOrder(orderId: string): Promise<Order | undefined> {
    try {
      const order = await this.orderRepository.findOne({
        where: { id: orderId },
        relations: { user: true, product: true },
      });

      if (!order) {
        throw new NotFoundException(
          `Order with id ${orderId}  does not exist or deleted`,
        );
      }
      return order;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async getAllOrders({
    limit,
    page,
    route,
    status = 'all',
  }): Promise<Pagination<Order>> {
    try {
      const qb = this.orderRepository
        .createQueryBuilder('order')
        .leftJoin('order.user', 'user')
        .select('user.username')
        .addSelect('order.quantity')
        .addSelect('order.type')
        .addSelect('order.total')
        .addSelect('order.shippingDetails')
        .addSelect('order.status')
        .addSelect('order.id')
        .addSelect('order.createdAt')
        .orderBy('order.created_at', 'DESC');
      if (status !== 'all') {
        qb.where('order.status=:status', { status });
      }
      return paginate<Order>(qb, { limit, page, route });
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async getOrders(
    user: User,
    pagination?: IPaginationOptions,
  ): Promise<Pagination<Order> | Order[]> {
    if (!pagination) {
      const Orders = await this.orderRepository.find({
        where: [{ user: { id: user.id } }, { sellerId: user.id }],
        relations:['product'],
        select: [
          'quantity',
          'createdAt',
          'status',
          'user.id',
          'product.name',
        ] as Array<keyof Order>,
      });
      return Orders;
    }
    const { limit, page, route } = pagination;
    const qb = this.orderRepository.createQueryBuilder('order');
    qb.leftJoin('order.product', 'product').select('product.name');
    qb.leftJoin('order.user', 'user')
      .select('user.id')
      .addSelect('order.quantity')
      .addSelect('order.createdAt')
      .addSelect('order.status');
    qb.where('order.seller_id = :sellerId OR order.user.id =:userId', {
      sellerId: user.id,
      userId: user.id,
    });
    qb.orderBy('order.created_at', 'DESC');

    return paginate<Order>(qb, { limit, page, route });
  }

  public async getActiveOrders(
    id: string,
    { limit, page, route }: IPaginationOptions,
  ): Promise<Pagination<Order>> {
    try {
      const qb = this.orderRepository.createQueryBuilder('order');
      qb.leftJoin('order.user', 'user')
        .select('user.username')
        .addSelect('order.quantity')
        .addSelect('order.type')
        .addSelect('order.total')
        .addSelect('order.shippingDetails')
        .addSelect('order.status')
        .addSelect('order.id')
        .addSelect('order.createdAt')
        .where('user.id=:user', { user: id })
        .andWhere('order.status=:status', {
          status: Status.PAID,
        });

      return paginate<Order>(qb, { limit, page, route });
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async updateOrderStatus(
    orderId: string,
    body: UpdateOrderDto,
  ): Promise<Order | undefined> {
    try {
      const order = await this.getOrder(orderId);
      order.status = body.status;
      return await this.orderRepository.save(order);
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  //  SELLERS ANALYTICS

  // TODO: get revenue analytic for past two months just like orders
  public async revenueAnalytics(sellerId: string) {
    try {
      const data = await this.orderRepository
        .createQueryBuilder('order__')
        .where('order__.sellerId = :sellerId', { sellerId })
        .andWhere('order__.status = :status', { status: Status.PAID })
        .select('SUM(order__.total)', 'revenue')
        .getRawMany();

      return data;
    } catch (err: any) {
      throw new HttpException(err.message, err.status);
    }
  }

  public async orderAnalytics(userId: string): Promise<OrderAnalyticsT> {
    const date = new Date();
    const day = date.getDate();
    const month: number = date.getMonth();
    const year = date.getFullYear();

    // month is indexed at 0
    const presentMonth = year + '-' + (month + 1) + '-' + day;
    const lastMonth = year + '-' + month + '-' + day;
    const twoMonths = year + '-' + (month - 1) + '-' + day;

    //Query the number of all orders with status paid
    const thisMonthOrder = await this.orderRepository
      .createQueryBuilder('order')
      .where('order.sellerId = :sellerId', { sellerId: userId })
      .andWhere('order.user_id != :userId', { userId })
      .andWhere('order.status = :status', { status: Status.PAID })
      .andWhere('order.created_at BETWEEN :startDate AND :endDate', {
        startDate: lastMonth,
        endDate: presentMonth,
      })
      .getCount();

    const lastTwoMonthsOrder = await this.orderRepository
      .createQueryBuilder('order')
      .where('order.sellerId = :sellerId', { sellerId: userId })
      .andWhere('order.user_id != :userId', { userId })
      .andWhere('order.status = :status', { status: Status.PAID })
      .andWhere('order.created_at BETWEEN :startDate AND :endDate', {
        startDate: twoMonths,
        endDate: lastMonth,
      })
      .getCount();

    // compare the numbers, and show the percentage increase or decrease
    return {
      thisMonthOrder,
      lastTwoMonthsOrder,
    };
  }
}
