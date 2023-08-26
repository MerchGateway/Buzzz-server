"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.WalletController = void 0;
var common_1 = require("@nestjs/common");
var WalletController = /** @class */ (function () {
    function WalletController(walletService) {
        this.walletService = walletService;
    }
    WalletController.prototype.findOne = function (walletId) {
        return this.walletService.getByWalletId(walletId);
    };
    WalletController.prototype.fund = function (walletId) {
        return this.walletService.fundWallet(walletId);
    };
    WalletController.prototype.withdraw = function (walletId) {
        return this.walletService.withdrawFromWallet(walletId);
    };
    __decorate([
        (0, common_1.Get)(':walletId'),
        __param(0, (0, common_1.Param)('walletId'))
    ], WalletController.prototype, "findOne");
    __decorate([
        (0, common_1.Post)(':walletId/fund'),
        __param(0, (0, common_1.Param)('walletId'))
    ], WalletController.prototype, "fund");
    __decorate([
        (0, common_1.Post)(':walletId/withdraw'),
        __param(0, (0, common_1.Param)('walletId'))
    ], WalletController.prototype, "withdraw");
    WalletController = __decorate([
        (0, common_1.Controller)('wallets')
    ], WalletController);
    return WalletController;
}());
exports.WalletController = WalletController;
