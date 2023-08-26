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
exports.TwoFactorAuthController = void 0;
var common_1 = require("@nestjs/common");
var user_decorator_1 = require("../../decorators/user.decorator");
var TwoFactorAuthController = /** @class */ (function () {
    function TwoFactorAuthController(twoFactorAuthService) {
        this.twoFactorAuthService = twoFactorAuthService;
    }
    TwoFactorAuthController.prototype.toogleTwoFa = function (payload, user) {
        return this.twoFactorAuthService.toggle2fa(payload, user);
    };
    TwoFactorAuthController.prototype.initialize2fa = function (user) {
        return this.twoFactorAuthService.initialize2fa(user);
    };
    __decorate([
        (0, common_1.Post)('toggle-2fa'),
        (0, common_1.HttpCode)(200),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, user_decorator_1.CurrentUser)())
    ], TwoFactorAuthController.prototype, "toogleTwoFa");
    __decorate([
        (0, common_1.Get)('initialize-2fa'),
        (0, common_1.HttpCode)(200),
        __param(0, (0, user_decorator_1.CurrentUser)())
    ], TwoFactorAuthController.prototype, "initialize2fa");
    TwoFactorAuthController = __decorate([
        (0, common_1.Controller)('2fa')
    ], TwoFactorAuthController);
    return TwoFactorAuthController;
}());
exports.TwoFactorAuthController = TwoFactorAuthController;
