"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PaystackBrokerModule = void 0;
var common_1 = require("@nestjs/common");
// import { TypeOrmModule } from '@nestjs/typeorm';
var paystack_service_1 = require("./paystack.service");
var paystack_controller_1 = require("./paystack.controller");
var payment_entity_1 = require("../entities/payment.entity");
var typeorm_1 = require("@nestjs/typeorm");
var product_module_1 = require("../../../../../../../../../src/app/product/product.module");
var cart_module_1 = require("../../../../../../../../../src/app/cart/cart.module");
var users_module_1 = require("../../../../../../../../../src/app/users/users.module");
var transaction_module_1 = require("../../../../../../../../../src/app/transaction/transaction.module");
var PaystackBrokerModule = /** @class */ (function () {
    function PaystackBrokerModule() {
    }
    PaystackBrokerModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([payment_entity_1.PaymentReceipt]),
                product_module_1.ProductModule,
                cart_module_1.CartModule,
                users_module_1.UsersModule,
                transaction_module_1.TransactionModule,
            ],
            controllers: [paystack_controller_1.PaystackBrokerController],
            providers: [paystack_service_1.PaystackBrokerService],
            exports: [paystack_service_1.PaystackBrokerService]
        })
    ], PaystackBrokerModule);
    return PaystackBrokerModule;
}());
exports.PaystackBrokerModule = PaystackBrokerModule;
