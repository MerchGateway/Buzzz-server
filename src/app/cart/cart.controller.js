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
exports.CartController = void 0;
var common_1 = require("@nestjs/common");
var user_decorator_1 = require("../../decorators/user.decorator");
// import { Public } from 'src/decorators/public.decorator';
var CartController = /** @class */ (function () {
    function CartController(cartService) {
        this.cartService = cartService;
    }
    CartController.prototype.getCartItems = function (user) {
        return this.cartService.getCartItems(user);
    };
    CartController.prototype.createCartItem = function (createCartDto, user) {
        return this.cartService.createCartItem(createCartDto, user);
    };
    CartController.prototype.createMultipleCartItem = function (createCartDto, user) {
        return this.cartService.createMultipleCartItem(createCartDto, user);
    };
    CartController.prototype.deleteCartItem = function (cartId) {
        return this.cartService.deleteCartItem(cartId);
    };
    CartController.prototype.getSingleCartItem = function (cartId) {
        return this.cartService.getSingleCartItem(cartId);
    };
    CartController.prototype.updateCartItem = function (payload, cartId) {
        return this.cartService.updateCartItemQuantity(payload, cartId);
    };
    __decorate([
        (0, common_1.Get)(''),
        __param(0, (0, user_decorator_1.CurrentUser)())
    ], CartController.prototype, "getCartItems");
    __decorate([
        (0, common_1.Post)(''),
        (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, user_decorator_1.CurrentUser)())
    ], CartController.prototype, "createCartItem");
    __decorate([
        (0, common_1.Post)('multiple-item'),
        (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, user_decorator_1.CurrentUser)())
    ], CartController.prototype, "createMultipleCartItem");
    __decorate([
        (0, common_1.Delete)(':cartId'),
        __param(0, (0, common_1.Param)('cartId', common_1.ParseUUIDPipe))
    ], CartController.prototype, "deleteCartItem");
    __decorate([
        (0, common_1.Get)(':cartId'),
        __param(0, (0, common_1.Param)('cartId', common_1.ParseUUIDPipe))
    ], CartController.prototype, "getSingleCartItem");
    __decorate([
        (0, common_1.Put)(':cartId'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Param)('cartId', common_1.ParseUUIDPipe))
    ], CartController.prototype, "updateCartItem");
    CartController = __decorate([
        (0, common_1.Controller)('cart')
    ], CartController);
    return CartController;
}());
exports.CartController = CartController;
