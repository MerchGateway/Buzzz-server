import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import configuration from '../config/configuration';
import { WinstonLoggerService } from '../logger/winston-logger/winston-logger.service';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RequestLoggingInterceptor } from '../request-logging.interceptor';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { TransactionModule } from './transaction/transaction.module';
import { CartModule } from './cart/cart.module';

import { PaymentModule } from './payment/payment.module';
import { ContactModule } from './contact/contact.module';

import { ErrorsInterceptor } from 'src/interceptor/error.interceptor';
import { CustomersModule } from './customers/customers.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { WalletModule } from './wallet/wallet.module';
import { WalletTransactionsModule } from './wallet-transactions/wallet-transactions.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    CategoryModule,
    CartModule,
    ProductModule,
    OrderModule,
    TransactionModule,
    PaymentModule,
    ContactModule,
    WalletModule,
    WalletTransactionsModule,
    CustomersModule,
    AnalyticsModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    WinstonLoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },

    
  ],
})
export class AppModule {}
