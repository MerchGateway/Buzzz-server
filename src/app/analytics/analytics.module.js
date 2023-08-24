"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AnalyticsModule = void 0;
var common_1 = require("@nestjs/common");
var analytics_service_1 = require("./analytics.service");
var analytics_controller_1 = require("./analytics.controller");
var transaction_module_1 = require("../transaction/transaction.module");
var analytics_entity_1 = require("./entities/analytics.entity");
var typeorm_1 = require("@nestjs/typeorm");
var order_module_1 = require("../order/order.module");
var customers_module_1 = require("../customers/customers.module");
var AnalyticsModule = /** @class */ (function () {
    function AnalyticsModule() {
    }
    AnalyticsModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([analytics_entity_1.Analytics]),
                transaction_module_1.TransactionModule,
                order_module_1.OrderModule,
                customers_module_1.CustomersModule,
            ],
            controllers: [analytics_controller_1.AnalyticsController],
            providers: [analytics_service_1.AnalyticsService],
            exports: [analytics_service_1.AnalyticsService]
        })
    ], AnalyticsModule);
    return AnalyticsModule;
}());
exports.AnalyticsModule = AnalyticsModule;
