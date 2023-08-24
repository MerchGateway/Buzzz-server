"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var database_module_1 = require("../database/database.module");
var auth_module_1 = require("./auth/auth.module");
var users_module_1 = require("./users/users.module");
var configuration_1 = require("../config/configuration");
var winston_logger_service_1 = require("../logger/winston-logger/winston-logger.service");
var core_1 = require("@nestjs/core");
var request_logging_interceptor_1 = require("../request-logging.interceptor");
var jwt_auth_guard_1 = require("./auth/guards/jwt-auth.guard");
var category_module_1 = require("./category/category.module");
var product_module_1 = require("./product/product.module");
var order_module_1 = require("./order/order.module");
var transaction_module_1 = require("./transaction/transaction.module");
var cart_module_1 = require("./cart/cart.module");
var payment_module_1 = require("./payment/payment.module");
var contact_module_1 = require("./contact/contact.module");
var error_interceptor_1 = require("../interceptor/error.interceptor");
var customers_module_1 = require("./customers/customers.module");
var analytics_module_1 = require("./analytics/analytics.module");
var wallet_module_1 = require("./wallet/wallet.module");
var wallet_transactions_module_1 = require("./wallet-transactions/wallet-transactions.module");
var notification_module_1 = require("./notification/notification.module");
var design_controller_1 = require("./design/design.controller");
var design_module_1 = require("./design/design.module");
var jwt_1 = require("@nestjs/jwt");
var serve_static_1 = require("@nestjs/serve-static");
var path_1 = require("path");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({ isGlobal: true, load: [configuration_1["default"]] }),
                serve_static_1.ServeStaticModule.forRoot({
                    rootPath: (0, path_1.join)(__dirname, '..', '..', 'public')
                }),
                jwt_1.JwtModule.register({
                    secret: (0, configuration_1["default"])().jwt.secret,
                    signOptions: { expiresIn: (0, configuration_1["default"])().jwt.expiresIn }
                }),
                database_module_1.DatabaseModule,
                auth_module_1.AuthModule,
                users_module_1.UsersModule,
                category_module_1.CategoryModule,
                cart_module_1.CartModule,
                product_module_1.ProductModule,
                order_module_1.OrderModule,
                transaction_module_1.TransactionModule,
                payment_module_1.PaymentModule,
                contact_module_1.ContactModule,
                wallet_module_1.WalletModule,
                wallet_transactions_module_1.WalletTransactionsModule,
                customers_module_1.CustomersModule,
                analytics_module_1.AnalyticsModule,
                notification_module_1.NotificationModule,
                design_module_1.DesignModule,
            ],
            controllers: [app_controller_1.AppController, design_controller_1.DesignController],
            providers: [
                app_service_1.AppService,
                winston_logger_service_1.WinstonLoggerService,
                {
                    provide: core_1.APP_INTERCEPTOR,
                    useClass: request_logging_interceptor_1.RequestLoggingInterceptor
                },
                {
                    provide: core_1.APP_GUARD,
                    useClass: jwt_auth_guard_1.JwtAuthGuard
                },
                {
                    provide: core_1.APP_INTERCEPTOR,
                    useClass: error_interceptor_1.ErrorsInterceptor
                },
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
