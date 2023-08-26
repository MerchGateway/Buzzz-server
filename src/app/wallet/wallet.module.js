"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WalletModule = void 0;
var common_1 = require("@nestjs/common");
var wallet_service_1 = require("./wallet.service");
var wallet_controller_1 = require("./wallet.controller");
var wallet_transactions_module_1 = require("../wallet-transactions/wallet-transactions.module");
var wallet_entity_1 = require("./entities/wallet.entity");
var typeorm_1 = require("@nestjs/typeorm");
var WalletModule = /** @class */ (function () {
    function WalletModule() {
    }
    WalletModule = __decorate([
        (0, common_1.Module)({
            imports: [wallet_transactions_module_1.WalletTransactionsModule, typeorm_1.TypeOrmModule.forFeature([wallet_entity_1.Wallet])],
            controllers: [wallet_controller_1.WalletController],
            providers: [wallet_service_1.WalletService],
            exports: [wallet_service_1.WalletService]
        })
    ], WalletModule);
    return WalletModule;
}());
exports.WalletModule = WalletModule;
