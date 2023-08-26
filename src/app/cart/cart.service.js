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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CartService = void 0;
var typeorm_1 = require("@nestjs/typeorm");
var common_1 = require("@nestjs/common");
var cart_entity_1 = require("./entities/cart.entity");
var CartService = /** @class */ (function () {
    function CartService(cartRepository, product) {
        this.cartRepository = cartRepository;
        this.product = product;
    }
    CartService.prototype.createCartItem = function (cartDto, user) {
        return __awaiter(this, void 0, void 0, function () {
            var productItem, isCart, cartItem, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, this.product.handleGetAProduct(cartDto.product)];
                    case 1:
                        productItem = _a.sent();
                        if (!productItem) {
                            throw new common_1.NotFoundException("Product  with id ".concat(cartDto.product, " does not exist"));
                        }
                        return [4 /*yield*/, this.checkIfCartExist(cartDto.product)];
                    case 2:
                        isCart = _a.sent();
                        if (!isCart) return [3 /*break*/, 4];
                        isCart.quantity += cartDto.quantity;
                        return [4 /*yield*/, this.cartRepository.save(isCart)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        cartItem = this.cartRepository.create({
                            owner: user,
                            quantity: cartDto.quantity,
                            product: productItem,
                            size: cartDto === null || cartDto === void 0 ? void 0 : cartDto.size,
                            color: cartDto === null || cartDto === void 0 ? void 0 : cartDto.color
                        });
                        return [4 /*yield*/, this.cartRepository.save(cartItem)];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        err_1 = _a.sent();
                        throw new common_1.HttpException(err_1.message, err_1.status);
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    CartService.prototype.createMultipleCartItem = function (cartDto, user) {
        return __awaiter(this, void 0, void 0, function () {
            var items, err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Promise.all(cartDto.map(function (cart) { return __awaiter(_this, void 0, void 0, function () {
                                var productItem, isCart, cartItem;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.product.handleGetAProduct(cart.product)];
                                        case 1:
                                            productItem = _a.sent();
                                            if (!productItem) {
                                                throw new common_1.NotFoundException("Product  with id ".concat(cart.product, " does not exist"));
                                            }
                                            return [4 /*yield*/, this.checkIfCartExist(cart.product)];
                                        case 2:
                                            isCart = _a.sent();
                                            if (!isCart) return [3 /*break*/, 4];
                                            isCart.quantity += cart.quantity;
                                            return [4 /*yield*/, this.cartRepository.save(isCart)];
                                        case 3: return [2 /*return*/, _a.sent()];
                                        case 4:
                                            cartItem = this.cartRepository.create({
                                                owner: user,
                                                quantity: cart.quantity,
                                                product: productItem,
                                                size: cart === null || cart === void 0 ? void 0 : cart.size,
                                                color: cart === null || cart === void 0 ? void 0 : cart.color
                                            });
                                            return [4 /*yield*/, this.cartRepository.save(cartItem)];
                                        case 5: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); }))];
                    case 1:
                        items = _a.sent();
                        return [2 /*return*/, items];
                    case 2:
                        err_2 = _a.sent();
                        throw new common_1.HttpException(err_2.message, err_2.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CartService.prototype.checkIfCartExist = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cartRepository.findOne({
                            where: {
                                product: { id: product }
                            },
                            relations: { product: true }
                        })];
                    case 1: 
                    // search if cart item exists already and update if it does
                    //  fetch new instance of the just updated cart item
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CartService.prototype.updateCartItemQuantity = function (cartDto, cartId) {
        return __awaiter(this, void 0, void 0, function () {
            var cartItem, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getSingleCartItem(cartId)];
                    case 1:
                        cartItem = _a.sent();
                        // update quantity if it exists
                        cartItem.quantity = cartDto.quantity;
                        cartDto.size && (cartItem.size = cartDto.size);
                        return [4 /*yield*/, this.cartRepository.save(cartItem)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_3 = _a.sent();
                        throw new common_1.HttpException(err_3.message, err_3.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CartService.prototype.getCartItems = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var cartItems, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.cartRepository.find({
                                where: { owner: { id: user.id } },
                                relations: { product: true }
                            })];
                    case 1:
                        cartItems = _a.sent();
                        return [2 /*return*/, cartItems];
                    case 2:
                        err_4 = _a.sent();
                        throw new common_1.HttpException(err_4.message, err_4.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CartService.prototype.getSingleCartItem = function (cartId) {
        return __awaiter(this, void 0, void 0, function () {
            var cartItem, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.cartRepository.findOne({
                                where: { id: cartId },
                                relations: { product: true }
                            })];
                    case 1:
                        cartItem = _a.sent();
                        if (!cartItem) {
                            throw new common_1.NotFoundException("Cart item with id ".concat(cartId, " does not exist"));
                        }
                        return [2 /*return*/, cartItem];
                    case 2:
                        err_5 = _a.sent();
                        throw new common_1.HttpException(err_5.message, err_5.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CartService.prototype.deleteCartItem = function (cartId) {
        return __awaiter(this, void 0, void 0, function () {
            var cartItem, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.cartRepository.findOne({
                                where: { id: cartId },
                                relations: { product: true }
                            })];
                    case 1:
                        cartItem = _a.sent();
                        if (!cartItem) {
                            throw new common_1.NotFoundException("Cart item with id ".concat(cartId, " does not exist"));
                        }
                        return [4 /*yield*/, this.cartRepository["delete"](cartId)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, cartItem];
                    case 3:
                        err_6 = _a.sent();
                        throw new common_1.HttpException(err_6.message, err_6.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CartService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart))
    ], CartService);
    return CartService;
}());
exports.CartService = CartService;
