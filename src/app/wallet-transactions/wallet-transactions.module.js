"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WalletTransactionsModule = void 0;
var common_1 = require("@nestjs/common");
var wallet_transactions_service_1 = require("./wallet-transactions.service");
var wallet_transactions_controller_1 = require("./wallet-transactions.controller");
var wallet_transaction_entity_1 = require("./entities/wallet-transaction.entity");
var typeorm_1 = require("@nestjs/typeorm");
var WalletTransactionsModule = /** @class */ (function () {
    function WalletTransactionsModule() {
    }
    WalletTransactionsModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([wallet_transaction_entity_1.WalletTransaction])],
            controllers: [wallet_transactions_controller_1.WalletTransactionsController],
            providers: [wallet_transactions_service_1.WalletTransactionsService],
            exports: [wallet_transactions_service_1.WalletTransactionsService]
        })
    ], WalletTransactionsModule);
    return WalletTransactionsModule;
}());
exports.WalletTransactionsModule = WalletTransactionsModule;
