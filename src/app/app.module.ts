import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from './auth/auth.module';
import { WaitlistModule } from './waitlist/waitlist.module';
import { UsersModule } from './users/users.module';
import configuration from '../config/configuration';
import { WinstonLoggerService } from '../logger/winston-logger/winston-logger.service';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RequestLoggingInterceptor } from '../interceptor/request-logging.interceptor';
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
import { NotificationModule } from './notification/notification.module';
import { DesignController } from './design/design.controller';
import { DesignModule } from './design/design.module';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FeeModule } from './fee/fee.module';
import { GiftModule } from './gifting/gift.module';
import { OtpModule } from './otp/otp.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [configuration],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
    }),
    JwtModule.register({
      secret: configuration().jwt.secret,
      signOptions: { expiresIn: configuration().jwt.expiresIn },
    }),
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
    CustomersModule,
    AnalyticsModule,
    NotificationModule,
    DesignModule,
    FeeModule,
    OtpModule,
    WaitlistModule,
    GiftModule,
  ],
  controllers: [AppController, DesignController],
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
