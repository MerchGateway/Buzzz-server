"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Wallet = void 0;
var typeorm_1 = require("typeorm");
var wallet_transaction_entity_1 = require("../../wallet-transactions/entities/wallet-transaction.entity");
var Wallet = /** @class */ (function () {
    function Wallet() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], Wallet.prototype, "id");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return wallet_transaction_entity_1.WalletTransaction; }, function (walletTransaction) { return walletTransaction.wallet; })
    ], Wallet.prototype, "transactions");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Wallet.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], Wallet.prototype, "updatedAt");
    Wallet = __decorate([
        (0, typeorm_1.Entity)()
    ], Wallet);
    return Wallet;
}());
exports.Wallet = Wallet;
