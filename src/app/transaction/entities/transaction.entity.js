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
exports.Transaction = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../users/entities/user.entity");
var transaction_1 = require("../../../../../../../../../src/types/transaction");
var order_entity_1 = require("../../../../../../../../../src/app/order/entities/order.entity");
var Transaction = /** @class */ (function (_super) {
    __extends(Transaction, _super);
    function Transaction() {
        return _super.call(this) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], Transaction.prototype, "id");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, {
            cascade: true
        }),
        (0, typeorm_1.JoinColumn)({ name: 'client_id' })
    ], Transaction.prototype, "user");
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', unique: true })
    ], Transaction.prototype, "reference");
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', nullable: true })
    ], Transaction.prototype, "fee");
    __decorate([
        (0, typeorm_1.Column)({ type: 'numeric', nullable: true })
    ], Transaction.prototype, "amount");
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', nullable: true })
    ], Transaction.prototype, "currency");
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', nullable: true })
    ], Transaction.prototype, "message");
    __decorate([
        (0, typeorm_1.Column)({ type: 'enum', "enum": transaction_1.Status, "default": transaction_1.Status.PENDING })
    ], Transaction.prototype, "status");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return order_entity_1.Order; }, function (order) { return order.transaction; }, { eager: true })
    ], Transaction.prototype, "orders");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Transaction.prototype, "created_at");
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            "enum": ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer']
        })
    ], Transaction.prototype, "channel");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], Transaction.prototype, "updated_at");
    Transaction = __decorate([
        (0, typeorm_1.Entity)('transaction')
    ], Transaction);
    return Transaction;
}(typeorm_1.BaseEntity));
exports.Transaction = Transaction;
