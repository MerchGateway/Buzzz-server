"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TransactionModule = void 0;
var common_1 = require("@nestjs/common");
var transaction_controller_1 = require("./transaction.controller");
var transaction_service_1 = require("./transaction.service");
var transaction_entity_1 = require("./entities/transaction.entity");
var typeorm_1 = require("@nestjs/typeorm");
var order_module_1 = require("../order/order.module");
var cart_module_1 = require("../cart/cart.module");
var product_module_1 = require("../product/product.module");
var customers_module_1 = require("../customers/customers.module");
var polymailer_content_entity_1 = require("../order/entities/polymailer_content.entity");
var TransactionModule = /** @class */ (function () {
    function TransactionModule() {
    }
    TransactionModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([transaction_entity_1.Transaction, polymailer_content_entity_1.PolyMailerContent]),
                order_module_1.OrderModule,
                cart_module_1.CartModule,
                product_module_1.ProductModule,
                customers_module_1.CustomersModule,
            ],
            controllers: [transaction_controller_1.TransactionController],
            providers: [transaction_service_1.TransactionService],
            exports: [transaction_service_1.TransactionService]
        })
    ], TransactionModule);
    return TransactionModule;
}());
exports.TransactionModule = TransactionModule;
