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
exports.TransactionService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var typeorm_2 = require("typeorm");
var transaction_entity_1 = require("./entities/transaction.entity");
var connection_1 = require("../payment/paystack/utils/connection");
var order_1 = require("../../types/order");
var moment_1 = require("moment");
var constant_1 = require("../../constant");
var polymailer_content_entity_1 = require("../order/entities/polymailer_content.entity");
var transaction_1 = require("../../types/transaction");
var nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
var TransactionService = /** @class */ (function () {
    function TransactionService(transactionRepository, polyMailerContentRepository, orderService, customerService, productService) {
        this.transactionRepository = transactionRepository;
        this.polyMailerContentRepository = polyMailerContentRepository;
        this.orderService = orderService;
        this.customerService = customerService;
        this.productService = productService;
    }
    TransactionService.prototype.createTransaction = function (reference, user, message) {
        return __awaiter(this, void 0, void 0, function () {
            var orders, transaction, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.orderService.createOrder({ shipping_address: user.shipping_address }, user)];
                    case 1:
                        orders = _a.sent();
                        transaction = this.transactionRepository.create({
                            reference: reference,
                            user: user,
                            message: message,
                            orders: orders
                        });
                        return [4 /*yield*/, this.transactionRepository.save(transaction)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_1 = _a.sent();
                        throw new common_1.HttpException(err_1.message, err_1.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TransactionService.prototype.getTransactionsForAuthUser = function (user, _a) {
        var limit = _a.limit, page = _a.page, route = _a.route;
        return __awaiter(this, void 0, void 0, function () {
            var qb;
            return __generator(this, function (_b) {
                try {
                    qb = this.transactionRepository.createQueryBuilder('transaction');
                    typeorm_2.FindOptionsUtils.joinEagerRelations(qb, qb.alias, this.transactionRepository.metadata);
                    qb.leftJoinAndSelect('transaction.user', 'user').where('user.id=:user', {
                        user: user.id
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
    TransactionService.prototype.getTransactions = function (_a) {
        var limit = _a.limit, page = _a.page, route = _a.route;
        return __awaiter(this, void 0, void 0, function () {
            var qb;
            return __generator(this, function (_b) {
                try {
                    qb = this.transactionRepository.createQueryBuilder('transaction');
                    typeorm_2.FindOptionsUtils.joinEagerRelations(qb, qb.alias, this.transactionRepository.metadata);
                    qb.leftJoinAndSelect('transaction.user', 'user');
                    // const transactions = await this.transactionRepository.find({
                    //   relations: ['user'],
                    // });
                    return [2 /*return*/, (0, nestjs_typeorm_paginate_1.paginate)(qb, { limit: limit, page: page, route: route })];
                }
                catch (err) {
                    throw new common_1.HttpException(err.message, err.status);
                }
                return [2 /*return*/];
            });
        });
    };
    TransactionService.prototype.getATransaction = function (transactionId) {
        return __awaiter(this, void 0, void 0, function () {
            var transaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transactionRepository.findOne({
                            where: { id: transactionId },
                            relations: { user: true, orders: true }
                        })];
                    case 1:
                        transaction = _a.sent();
                        if (!transaction) {
                            throw new common_1.NotFoundException("transaction with id ".concat(transactionId, " not found"));
                        }
                        return [2 /*return*/, transaction];
                }
            });
        });
    };
    TransactionService.prototype.verifyTransaction = function (reference) {
        return __awaiter(this, void 0, void 0, function () {
            var response, transactionSuccess, transactionFail, isTransaction_1, res, product, err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transactionSuccess = 'transaction-success.html';
                        transactionFail = 'transaction-fail.html';
                        // create connection instance of axios
                        this.axiosConnection = (0, connection_1["default"])();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, this.transactionRepository.findOneBy({
                                reference: reference
                            })];
                    case 2:
                        isTransaction_1 = _a.sent();
                        if (!isTransaction_1) {
                            throw new common_1.NotFoundException("Transaction with reference ".concat(reference, " does not exist"));
                        }
                        //verify transactiion status
                        return [4 /*yield*/, this.axiosConnection
                                .get("/transaction/verify/".concat(reference))
                                .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(res.data &&
                                                res.data.data.status === 'success' &&
                                                res.data.message === constant_1.PAYSTACK_SUCCESS_MESSAGE)) return [3 /*break*/, 2];
                                            isTransaction_1.fee = res.data.data.fees;
                                            isTransaction_1.currency = res.data.data.currency;
                                            isTransaction_1.channel = res.data.data.channel;
                                            isTransaction_1.amount = res.data.data.amount;
                                            isTransaction_1.message = 'Transaction successful';
                                            isTransaction_1.status = transaction_1.Status.SUCCESS;
                                            // set the status of order to paid on successful payment verification
                                            return [4 /*yield*/, Promise.all(isTransaction_1.orders.map(function (order) { return __awaiter(_this, void 0, void 0, function () {
                                                    var polymailerContents, random;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, order.updateStatus(order_1.Status.PAID)];
                                                            case 1:
                                                                _a.sent();
                                                                return [4 /*yield*/, this.polyMailerContentRepository.find()];
                                                            case 2:
                                                                polymailerContents = _a.sent();
                                                                random = Math.floor(Math.random() * polymailerContents.length);
                                                                console.log(random, order.user.name.split(' ')[0], order.product.seller.name.split(' ')[0]);
                                                                // set polymailer details
                                                                order.polymailer_details = {
                                                                    to: order.user.name.split(' ')[0],
                                                                    from: order.product.seller.name.split(' ')[0],
                                                                    content: polymailerContents[0]
                                                                        ? polymailerContents[random].content
                                                                        : constant_1.DEFAULT_POLYMAILER_CONTENT
                                                                };
                                                                console.log(order);
                                                                return [4 /*yield*/, order.save()];
                                                            case 3:
                                                                _a.sent();
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); }))];
                                        case 1:
                                            // set the status of order to paid on successful payment verification
                                            _a.sent();
                                            response = transactionSuccess;
                                            return [3 /*break*/, 4];
                                        case 2:
                                            isTransaction_1.fee = res.data.data.fees;
                                            isTransaction_1.currency = res.data.data.currency;
                                            isTransaction_1.channel = res.data.data.channel;
                                            isTransaction_1.amount = res.data.data.amount;
                                            isTransaction_1.status = transaction_1.Status.FAILED;
                                            isTransaction_1.message = 'Transaction verification failed';
                                            return [4 /*yield*/, Promise.all(isTransaction_1.orders.map(function (order) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, order.updateStatus(order_1.Status.CANCELLED)];
                                                            case 1:
                                                                _a.sent();
                                                                return [4 /*yield*/, order.save()];
                                                            case 2:
                                                                _a.sent();
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); }))];
                                        case 3:
                                            _a.sent();
                                            response = transactionFail;
                                            _a.label = 4;
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](function (err) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            isTransaction_1.status = transaction_1.Status.FAILED;
                                            isTransaction_1.message = err.message;
                                            return [4 /*yield*/, Promise.all(isTransaction_1.orders.map(function (order) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, order.updateStatus(order_1.Status.CANCELLED)];
                                                            case 1:
                                                                _a.sent();
                                                                return [4 /*yield*/, order.save()];
                                                            case 2: return [2 /*return*/, _a.sent()];
                                                        }
                                                    });
                                                }); }))];
                                        case 1:
                                            _a.sent();
                                            response = transactionFail;
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 3:
                        //verify transactiion status
                        _a.sent();
                        //
                        return [4 /*yield*/, this.transactionRepository.save(isTransaction_1)];
                    case 4:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.getATransaction(isTransaction_1.id)];
                    case 5:
                        res = _a.sent();
                        return [4 /*yield*/, this.productService.handleGetAProduct(res.orders[0].product.id)];
                    case 6:
                        product = _a.sent();
                        // console.log(res)
                        // add user to customer list
                        return [4 /*yield*/, this.customerService.create(product.seller.id, res.user)];
                    case 7:
                        // console.log(res)
                        // add user to customer list
                        _a.sent();
                        // return res;
                        return [2 /*return*/, response];
                    case 8:
                        err_2 = _a.sent();
                        throw new common_1.HttpException(err_2.message, err_2.status);
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    TransactionService.prototype.deleteTransaction = function (reference) {
        return __awaiter(this, void 0, void 0, function () {
            var isTransaction, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.transactionRepository.findOneBy({
                                reference: reference
                            })];
                    case 1:
                        isTransaction = _a.sent();
                        if (!isTransaction) {
                            throw new common_1.NotFoundException("Transaction with reference ".concat(reference, " does not exist"));
                        }
                        return [4 /*yield*/, this.transactionRepository["delete"]({ reference: reference })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, isTransaction];
                    case 3:
                        err_3 = _a.sent();
                        console.log(err_3);
                        throw new common_1.HttpException(err_3.message, err_3.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TransactionService.prototype.salesAnalytics = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var Moment, report, start, end, start, end, start, end, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Moment = (0, moment_1["default"])();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        if (!(query === 'current-week')) return [3 /*break*/, 3];
                        start = Moment.startOf('week').format('YYYY-MM-DD');
                        end = Moment.endOf('week').format('YYYY-MM-DD');
                        return [4 /*yield*/, this.transactionRepository
                                .createQueryBuilder('transaction')
                                .select('SUM(transaction.amount)', 'sum')
                                .addSelect('WEEKDAY(transaction.updated_at)', 'week-day')
                                .where('transaction.status = :status', {
                                status: transaction_1.Status.SUCCESS
                            })
                                .andWhere("transaction.updated_at BETWEEN '".concat(start, "' AND '").concat(end, "'"))
                                .groupBy('WEEKDAY(transaction.updated_at)')
                                .orderBy('WEEKDAY(transaction.updated_at)')
                                .getRawMany()];
                    case 2:
                        report = _a.sent();
                        return [3 /*break*/, 7];
                    case 3:
                        if (!(query === 'current-month')) return [3 /*break*/, 5];
                        start = Moment.startOf('month').format('YYYY-MM-DD');
                        end = Moment.endOf('month').format('YYYY-MM-DD');
                        return [4 /*yield*/, this.transactionRepository
                                .createQueryBuilder('transaction')
                                .select('SUM(transaction.amount)', 'sum')
                                .addSelect('WEEKDAY(transaction.updated_at)', 'week-day')
                                .where('transaction.status = :status', {
                                status: transaction_1.Status.SUCCESS
                            })
                                .andWhere("transaction.updated_at BETWEEN '".concat(start, "' AND '").concat(end, "'"))
                                .groupBy('WEEKDAY(transaction.updated_at)')
                                .orderBy('WEEKDAY(transaction.updated_at)')
                                .getRawMany()];
                    case 4:
                        report = _a.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        start = Moment.startOf('year').format('YYYY-MM-DD');
                        end = Moment.endOf('year').format('YYYY-MM-DD');
                        return [4 /*yield*/, this.transactionRepository
                                .createQueryBuilder('transaction')
                                .select('SUM(transaction.amount)', 'sum')
                                .addSelect('EXTRACT (MONTH FROM transaction.updated_at)', 'month')
                                .where('transaction.status = :status', {
                                status: transaction_1.Status.SUCCESS
                            })
                                .andWhere("transaction.updated_at BETWEEN '".concat(start, "' AND '").concat(end, "'"))
                                .groupBy('EXTRACT (MONTH FROM transaction.updated_at)')
                                .orderBy('EXTRACT (MONTH FROM transaction.updated_at)')
                                .getRawMany()];
                    case 6:
                        report = _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/, report];
                    case 8:
                        err_4 = _a.sent();
                        throw new common_1.HttpException(err_4.message, err_4.status);
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    TransactionService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
        __param(1, (0, typeorm_1.InjectRepository)(polymailer_content_entity_1.PolyMailerContent))
    ], TransactionService);
    return TransactionService;
}());
exports.TransactionService = TransactionService;
