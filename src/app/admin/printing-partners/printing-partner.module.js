"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PrintingPartnerModule = void 0;
var common_1 = require("@nestjs/common");
var printing_partner_entity_1 = require("./entities/printing-partner.entity");
var typeorm_1 = require("@nestjs/typeorm");
var printing_partner_controller_1 = require("./printing-partner.controller");
var printing_partner_service_1 = require("./printing-partner.service");
var user_entity_1 = require("../../../../../../../../../src/app/users/entities/user.entity");
var order_entity_1 = require("../../../../../../../../../src/app/order/entities/order.entity");
var order_module_1 = require("../../../../../../../../../src/app/order/order.module");
var PrintingPartnerModule = /** @class */ (function () {
    function PrintingPartnerModule() {
    }
    PrintingPartnerModule = __decorate([
        (0, common_1.Module)({
            imports: [
                order_module_1.OrderModule, typeorm_1.TypeOrmModule.forFeature([printing_partner_entity_1.PrintingPartner, user_entity_1.User, order_entity_1.Order]),
            ],
            controllers: [printing_partner_controller_1.PrintingPartnerController],
            providers: [printing_partner_service_1.PrintingPartnerService],
            exports: [printing_partner_service_1.PrintingPartnerService]
        })
    ], PrintingPartnerModule);
    return PrintingPartnerModule;
}());
exports.PrintingPartnerModule = PrintingPartnerModule;
