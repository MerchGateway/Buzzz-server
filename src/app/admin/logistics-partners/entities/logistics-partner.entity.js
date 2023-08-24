"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LogisticsPartner = void 0;
var user_entity_1 = require("../../../../../../../../../../src/app/users/entities/user.entity");
var status_1 = require("../../../../../../../../../../src/types/status");
var typeorm_1 = require("typeorm");
var order_entity_1 = require("../../../../../../../../../../src/app/order/entities/order.entity");
var LogisticsPartner = /** @class */ (function (_super) {
    __extends(LogisticsPartner, _super);
    function LogisticsPartner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], LogisticsPartner.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({
            name: 'partner-name',
            unique: true
        })
    ], LogisticsPartner.prototype, "name");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return user_entity_1.User; }, function (user) { return user.logistics_partner; }, {
            cascade: true
        })
    ], LogisticsPartner.prototype, "administrators");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return order_entity_1.Order; }, function (order) { return order.logistics_partner; }, { eager: true })
    ], LogisticsPartner.prototype, "orders");
    __decorate([
        (0, typeorm_1.Column)({ type: 'simple-json' })
    ], LogisticsPartner.prototype, "partner_address");
    __decorate([
        (0, typeorm_1.Column)({ type: 'enum', "enum": status_1.Status, "default": status_1.Status.ENABLED })
    ], LogisticsPartner.prototype, "status");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], LogisticsPartner.prototype, "created_at");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], LogisticsPartner.prototype, "updated_at");
    LogisticsPartner = __decorate([
        (0, typeorm_1.Entity)('logistics-partner')
    ], LogisticsPartner);
    return LogisticsPartner;
}(typeorm_1.BaseEntity));
exports.LogisticsPartner = LogisticsPartner;
