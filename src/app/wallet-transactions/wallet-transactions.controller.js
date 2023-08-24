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
exports.WalletTransactionsController = void 0;
var common_1 = require("@nestjs/common");
var WalletTransactionsController = /** @class */ (function () {
    function WalletTransactionsController(walletTransactionsService) {
        this.walletTransactionsService = walletTransactionsService;
    }
    WalletTransactionsController.prototype.create = function (createWalletTransactionDto) {
        return this.walletTransactionsService.create(createWalletTransactionDto);
    };
    WalletTransactionsController.prototype.findAll = function () {
        return this.walletTransactionsService.findAll();
    };
    WalletTransactionsController.prototype.findOne = function (id) {
        return this.walletTransactionsService.findOne(+id);
    };
    WalletTransactionsController.prototype.update = function (id, updateWalletTransactionDto) {
        return this.walletTransactionsService.update(+id, updateWalletTransactionDto);
    };
    WalletTransactionsController.prototype.remove = function (id) {
        return this.walletTransactionsService.remove(+id);
    };
    __decorate([
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)())
    ], WalletTransactionsController.prototype, "create");
    __decorate([
        (0, common_1.Get)()
    ], WalletTransactionsController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], WalletTransactionsController.prototype, "findOne");
    __decorate([
        (0, common_1.Patch)(':id'),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)())
    ], WalletTransactionsController.prototype, "update");
    __decorate([
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], WalletTransactionsController.prototype, "remove");
    WalletTransactionsController = __decorate([
        (0, common_1.Controller)('wallet-transactions')
    ], WalletTransactionsController);
    return WalletTransactionsController;
}());
exports.WalletTransactionsController = WalletTransactionsController;
