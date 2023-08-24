"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CustomersModule = void 0;
var common_1 = require("@nestjs/common");
var customers_service_1 = require("./customers.service");
var customers_controller_1 = require("./customers.controller");
var users_module_1 = require("../users/users.module");
var customer_entity_1 = require("./entities/customer.entity");
var typeorm_1 = require("@nestjs/typeorm");
var order_module_1 = require("../order/order.module");
var CustomersModule = /** @class */ (function () {
    function CustomersModule() {
    }
    CustomersModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([customer_entity_1.Customer]), users_module_1.UsersModule, order_module_1.OrderModule],
            controllers: [customers_controller_1.CustomersController],
            providers: [customers_service_1.CustomersService, users_module_1.UsersModule, order_module_1.OrderModule],
            exports: [customers_service_1.CustomersService]
        })
    ], CustomersModule);
    return CustomersModule;
}());
exports.CustomersModule = CustomersModule;
