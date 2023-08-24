"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WalletTransaction = exports.TransactionMethod = exports.TransactionType = void 0;
var typeorm_1 = require("typeorm");
var wallet_entity_1 = require("../../wallet/entities/wallet.entity");
var TransactionType;
(function (TransactionType) {
    TransactionType["DEBIT"] = "DEBIT";
    TransactionType["CREDIT"] = "CREDIT";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
var TransactionMethod;
(function (TransactionMethod) {
    TransactionMethod["WITHDRAWAL"] = "WITHDRAWAL";
    TransactionMethod["SALES"] = "SALES";
})(TransactionMethod = exports.TransactionMethod || (exports.TransactionMethod = {}));
var WalletTransaction = /** @class */ (function () {
    function WalletTransaction() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], WalletTransaction.prototype, "id");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return wallet_entity_1.Wallet; }, function (wallet) { return wallet.transactions; }),
        (0, typeorm_1.JoinColumn)({ name: 'wallet_id' })
    ], WalletTransaction.prototype, "wallet");
    __decorate([
        (0, typeorm_1.Column)({ type: 'enum', "enum": TransactionType })
    ], WalletTransaction.prototype, "type");
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            "enum": TransactionMethod,
            "default": TransactionMethod.SALES
        })
    ], WalletTransaction.prototype, "method");
    __decorate([
        (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 })
    ], WalletTransaction.prototype, "amount");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], WalletTransaction.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], WalletTransaction.prototype, "updatedAt");
    WalletTransaction = __decorate([
        (0, typeorm_1.Entity)()
    ], WalletTransaction);
    return WalletTransaction;
}());
exports.WalletTransaction = WalletTransaction;
