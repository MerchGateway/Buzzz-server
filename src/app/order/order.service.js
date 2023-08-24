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
exports.OrderService = void 0;
var typeorm_1 = require("@nestjs/typeorm");
var typeorm_2 = require("typeorm");
var nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
var common_1 = require("@nestjs/common");
var common_2 = require("@nestjs/common");
var order_entity_1 = require("./entities/order.entity");
var cart_service_1 = require("../cart/cart.service");
var order_1 = require("../../../../../../../../src/types/order");
var OrderService = /** @class */ (function () {
    function OrderService(orderRepository, cartService) {
        this.orderRepository = orderRepository;
        this.cartService = cartService;
    }
    OrderService.prototype.createOrder = function (payload, user) {
        return __awaiter(this, void 0, void 0, function () {
            var userCartItems, result, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.cartService.getCartItems(user)];
                    case 1:
                        userCartItems = _a.sent();
                        // throw exception if there isnt any item in cart
                        if (!userCartItems[0]) {
                            throw new common_1.BadRequestException('Item{s} to create order for doesnt exist ');
                        }
                        return [4 /*yield*/, Promise.all(userCartItems.map(function (cart) { return __awaiter(_this, void 0, void 0, function () {
                                var order;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            order = new order_entity_1.Order();
                                            order.user = user;
                                            order.cart = cart;
                                            order.sellerId = cart.product.sellerId;
                                            if (payload.shipping_address !== null) {
                                                order.shipping_details = {
                                                    shipping_fee: 0,
                                                    shipping_address: payload.shipping_address
                                                };
                                            }
                                            return [4 /*yield*/, this.orderRepository.save(order)];
                                        case 1: 
                                        // // save cart items
                                        return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); }))];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        err_1 = _a.sent();
                        throw new common_1.HttpException(err_1.message, err_1.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderService.prototype.deleteOrder = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var isOrder, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.orderRepository.findOne({
                                where: { id: orderId }
                            })];
                    case 1:
                        isOrder = _a.sent();
                        if (!isOrder) {
                            throw new common_2.NotFoundException("Order with id ".concat(orderId, " does not exist"));
                        }
                        return [4 /*yield*/, this.orderRepository["delete"](orderId)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, isOrder];
                    case 3:
                        err_2 = _a.sent();
                        throw new common_1.HttpException(err_2.message, err_2.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderService.prototype.getOrder = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var order, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.orderRepository.findOne({
                                where: { id: orderId },
                                relations: { user: true }
                            })];
                    case 1:
                        order = _a.sent();
                        if (!order) {
                            throw new common_2.NotFoundException("Order with id ".concat(orderId, "  does not exist or deleted"));
                        }
                        return [2 /*return*/, order];
                    case 2:
                        err_3 = _a.sent();
                        throw new common_1.HttpException(err_3.message, err_3.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrderService.prototype.getAllOrders = function (_a) {
        var limit = _a.limit, page = _a.page, route = _a.route;
        return __awaiter(this, void 0, void 0, function () {
            var qb;
            return __generator(this, function (_b) {
                try {
                    qb = this.orderRepository.createQueryBuilder('order');
                    typeorm_2.FindOptionsUtils.joinEagerRelations(qb, qb.alias, this.orderRepository.metadata);
                    return [2 /*return*/, (0, nestjs_typeorm_paginate_1.paginate)(qb, { limit: limit, page: page, route: route })];
                }
                catch (err) {
                    throw new common_1.HttpException(err.message, err.status);
                }
                return [2 /*return*/];
            });
        });
    };
    OrderService.prototype.getOrders = function (user, pagination) {
        return __awaiter(this, void 0, void 0, function () {
            var Orders, limit, page, route, qb, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!!pagination) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.orderRepository.find({
                                where: {
                                    user: { id: user.id }
                                }
                            })];
                    case 1:
                        Orders = _a.sent();
                        return [2 /*return*/, Orders];
                    case 2:
                        limit = pagination.limit, page = pagination.page, route = pagination.route;
                        qb = this.orderRepository.createQueryBuilder('order');
                        typeorm_2.FindOptionsUtils.joinEagerRelations(qb, qb.alias, this.orderRepository.metadata);
                        qb.leftJoinAndSelect('order.user', 'user').where('user.id=:user', {
                            user: user.id
                        });
                        return [2 /*return*/, (0, nestjs_typeorm_paginate_1.paginate)(qb, { limit: limit, page: page, route: route })];
                    case 3:
                        err_4 = _a.sent();
                        throw new common_1.HttpException(err_4.message, err_4.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderService.prototype.getActiveOrders = function (id, _a) {
        var limit = _a.limit, page = _a.page, route = _a.route;
        return __awaiter(this, void 0, void 0, function () {
            var qb;
            return __generator(this, function (_b) {
                try {
                    qb = this.orderRepository.createQueryBuilder('order');
                    typeorm_2.FindOptionsUtils.joinEagerRelations(qb, qb.alias, this.orderRepository.metadata);
                    qb.leftJoinAndSelect('order.user', 'user')
                        .where('user.id=:user', { user: id })
                        .andWhere('order.status=:status', {
                        status: order_1.Status.PAID
                    });
                    return [2 /*return*/, (0, nestjs_typeorm_paginate_1.paginate)(qb, { limit: limit, page: page, route: route })];
                }
                catch (err) {
                    throw new common_1.HttpException(err.message, err.status);
                }
                return [2 /*return*/];
            });
        });
    };
    OrderService.prototype.completeOrder = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getOrder(orderId)];
                    case 1: 
                    // console.log(orderId);
                    // complete order logic eg when a users order is delievered
                    return [4 /*yield*/, (_a.sent()).updateStatus(order_1.Status.COMPLETED)];
                    case 2:
                        // console.log(orderId);
                        // complete order logic eg when a users order is delievered
                        _a.sent();
                        return [2 /*return*/];
                    case 3:
                        err_5 = _a.sent();
                        throw new common_1.HttpException(err_5.message, err_5.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //  SELLERS ANALYTICS
    // TODO: get revenue analytic for past two months just like orders
    OrderService.prototype.revenueAnalytics = function (sellerId) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.orderRepository
                                .createQueryBuilder('order__')
                                .where('order__.sellerId = :sellerId', { sellerId: sellerId })
                                .andWhere('order__.status = :status', { status: order_1.Status.PAID })
                                .select('SUM(order__.total)', 'revenue')
                                .getRawMany()];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 2:
                        err_6 = _a.sent();
                        throw new common_1.HttpException(err_6.message, err_6.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrderService.prototype.orderAnalytics = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var date, day, month, year, presentMonth, lastMonth, twoMonths, thisMonthOrder, lastTwoMonthsOrder, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        date = new Date();
                        day = date.getDate();
                        month = date.getMonth();
                        year = date.getFullYear();
                        presentMonth = year + '-' + (month + 1) + '-' + day;
                        lastMonth = year + '-' + month + '-' + day;
                        twoMonths = year + '-' + (month - 1) + '-' + day;
                        return [4 /*yield*/, this.orderRepository
                                .createQueryBuilder('orders')
                                .where('orders.sellerId = :sellerId', { sellerId: userId })
                                .andWhere('orders.status = :status', { status: order_1.Status.PAID })
                                //get the total orders within the last month,
                                .andWhere("orders.created_at BETWEEN ".concat(lastMonth, " AND ").concat(presentMonth))
                                .getCount()];
                    case 1:
                        thisMonthOrder = _a.sent();
                        return [4 /*yield*/, this.orderRepository
                                .createQueryBuilder('orders_')
                                .where('orders_.sellerId = :sellerId', { sellerId: userId })
                                .andWhere('orders_.status = :status', { status: order_1.Status.PAID })
                                // get the total orders within the last two months
                                .andWhere("orders_.created_at BETWEEN ".concat(twoMonths, " AND ").concat(lastMonth))
                                .getCount()];
                    case 2:
                        lastTwoMonthsOrder = _a.sent();
                        // compare the numbers, and show the percentage increase or decrease
                        return [2 /*return*/, {
                                thisMonthOrder: thisMonthOrder,
                                lastTwoMonthsOrder: lastTwoMonthsOrder
                            }];
                    case 3:
                        err_7 = _a.sent();
                        throw new common_1.HttpException(err_7.message, err_7.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
        __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(function () { return cart_service_1.CartService; })))
    ], OrderService);
    return OrderService;
}());
exports.OrderService = OrderService;
