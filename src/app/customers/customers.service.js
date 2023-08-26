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
exports.CustomersService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var customer_entity_1 = require("./entities/customer.entity");
var response_1 = require("../../utils/response");
var CustomersService = /** @class */ (function () {
    function CustomersService(customerRepository, userRepository, orderRepository) {
        this.customerRepository = customerRepository;
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
    }
    CustomersService.prototype.create = function (sellerId, user) {
        return __awaiter(this, void 0, void 0, function () {
            var res, customer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne(sellerId)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.customerRepository
                                .createQueryBuilder('findCustomer')
                                .where('sellerId = :sellerId', { sellerId: sellerId })
                                // .andWhere('customer = :customer', { customer: user })
                                .getOne()];
                    case 2:
                        res = _a.sent();
                        if (!!res) return [3 /*break*/, 4];
                        customer = new customer_entity_1.Customer();
                        customer.sellerId = sellerId;
                        customer.customer = [user];
                        return [4 /*yield*/, this.customerRepository.save(customer)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [2 /*return*/, res];
                }
            });
        });
    };
    CustomersService.prototype.findAll = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, sort, caller;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.customerRepository.find({
                            where: {
                                sellerId: userId
                            },
                            relations: {
                                customer: true
                            }
                        })];
                    case 1:
                        res = _a.sent();
                        sort = function (customer) { return __awaiter(_this, void 0, void 0, function () {
                            var orders, data;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.orderRepository.getOrders(customer.customer[0])];
                                    case 1:
                                        orders = _a.sent();
                                        data = {
                                            customer: customer,
                                            order: orders
                                        };
                                        return [2 /*return*/, data];
                                }
                            });
                        }); };
                        caller = function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, Promise.all(res === null || res === void 0 ? void 0 : res.map(function (h) { return sort(h); }))];
                            });
                        }); };
                        return [2 /*return*/, caller()];
                }
            });
        });
    };
    CustomersService.prototype.findAllCustomersAvailable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, sort, caller;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.customerRepository.find({
                            relations: {
                                customer: true
                            }
                        })];
                    case 1:
                        res = _a.sent();
                        sort = function (customer) { return __awaiter(_this, void 0, void 0, function () {
                            var orders, data;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.orderRepository.getOrders(customer.customer[0])];
                                    case 1:
                                        orders = _a.sent();
                                        data = {
                                            customer: customer,
                                            order: orders
                                        };
                                        return [2 /*return*/, data];
                                }
                            });
                        }); };
                        caller = function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, Promise.all(res === null || res === void 0 ? void 0 : res.map(function (h) { return sort(h); }))];
                            });
                        }); };
                        return [2 /*return*/, caller()];
                }
            });
        });
    };
    CustomersService.prototype.toggleStatus = function (Status, sellerId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.customerRepository.findOne({
                                where: { sellerId: sellerId },
                                relations: {
                                    customer: true
                                }
                            })];
                    case 1:
                        res = _a.sent();
                        if (!res) {
                            throw new common_1.NotFoundException("customer with seller id ".concat(sellerId, " does not exist"));
                        }
                        res.status = Status;
                        return [4 /*yield*/, this.customerRepository.save(res)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_1 = _a.sent();
                        throw new common_1.HttpException(err_1.message, err_1.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CustomersService.prototype.deleteCustomer = function (sellerId) {
        return __awaiter(this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.customerRepository["delete"]({ sellerId: sellerId })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new response_1.SuccessResponse({}, "customer with sellerId ".concat(sellerId, " deleted succesfully"), 200)];
                    case 2:
                        err_2 = _a.sent();
                        throw new common_1.HttpException(err_2.message, err_2.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CustomersService.prototype.customerAnalytics = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var date, day, month, year, presentMonth, lastMonth, twoMonths, thisMonthCustomers, lastTwoMonthsCustomers, allCustomers, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        date = new Date();
                        day = date.getDate();
                        month = date.getMonth();
                        year = date.getFullYear();
                        presentMonth = year + '-' + (month + 1) + '-' + day;
                        lastMonth = year + '-' + month + '-' + day;
                        twoMonths = year + '-' + (month - 1) + '-' + day;
                        return [4 /*yield*/, this.customerRepository
                                .createQueryBuilder('customers')
                                .where('customers.sellerId = :sellerId', { sellerId: user.id })
                                //get the total customers within the last month,
                                .andWhere("customers.created_at BETWEEN ".concat(lastMonth, " AND ").concat(presentMonth))
                                .getCount()];
                    case 1:
                        thisMonthCustomers = _a.sent();
                        return [4 /*yield*/, this.customerRepository
                                .createQueryBuilder('customers_')
                                .where('customers_.sellerId = :sellerId', { sellerId: user.id })
                                // get the total customers within the last two months
                                .andWhere("customers_.created_at BETWEEN ".concat(twoMonths, " AND ").concat(lastMonth))
                                .getCount()];
                    case 2:
                        lastTwoMonthsCustomers = _a.sent();
                        return [4 /*yield*/, this.customerRepository
                                .createQueryBuilder('customers__')
                                .where('customers__.sellerId = :sellerId', { sellerId: user.id })
                                .getCount()];
                    case 3:
                        allCustomers = _a.sent();
                        // compare the numbers, and show the percentage increase or decrease
                        return [2 /*return*/, {
                                allCustomers: allCustomers,
                                thisMonthCustomers: thisMonthCustomers,
                                lastTwoMonthsCustomers: lastTwoMonthsCustomers
                            }];
                    case 4:
                        err_3 = _a.sent();
                        throw new common_1.HttpException(err_3.message, err_3.statusCode || 500);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CustomersService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer))
    ], CustomersService);
    return CustomersService;
}());
exports.CustomersService = CustomersService;
