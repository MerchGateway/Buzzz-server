"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminModule = void 0;
var common_1 = require("@nestjs/common");
var admin_controller_1 = require("./admin.controller");
var admin_service_1 = require("./admin.service");
var printing_partner_module_1 = require("./printing-partners/printing-partner.module");
var typeorm_1 = require("@nestjs/typeorm");
var logistics_partner_module_1 = require("./logistics-partners/logistics-partner.module");
var roles_guard_1 = require("../auth/guards/roles.guard");
var logistics_partner_entity_1 = require("./logistics-partners/entities/logistics-partner.entity");
var printing_partner_entity_1 = require("./printing-partners/entities/printing-partner.entity");
var user_entity_1 = require("../users/entities/user.entity");
var core_1 = require("@nestjs/core");
var order_entity_1 = require("../order/entities/order.entity");
var AdminModule = /** @class */ (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([logistics_partner_entity_1.LogisticsPartner, user_entity_1.User, printing_partner_entity_1.PrintingPartner, order_entity_1.Order]),
                printing_partner_module_1.PrintingPartnerModule,
                logistics_partner_module_1.LogisticsPartnerModule,
            ],
            controllers: [admin_controller_1.AdminController],
            providers: [
                admin_service_1.AdminService,
                {
                    provide: core_1.APP_GUARD,
                    useClass: roles_guard_1.RolesGuard
                },
            ],
            exports: [admin_service_1.AdminService]
        })
    ], AdminModule);
    return AdminModule;
}());
exports.AdminModule = AdminModule;
