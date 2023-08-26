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
exports.PaystackBrokerService = void 0;
var common_1 = require("@nestjs/common");
// import configuration  from 'src/config/configuration';
var dotenv_1 = require("dotenv");
// import { CreatePayRefDto, PaymentReceiptDto } from '../dto/create-pay-ref-dto';
var payment_entity_1 = require("../entities/payment.entity");
var typeorm_1 = require("@nestjs/typeorm");
var connection_1 = require("./utils/connection");
// import { UpdateUserDto } from 'src/app/users/dto/update-user.dto';
(0, dotenv_1.config)();
var PaystackBrokerService = /** @class */ (function () {
    function PaystackBrokerService(paymentRepository, cartService, transactionService) {
        this.paymentRepository = paymentRepository;
        this.cartService = cartService;
        this.transactionService = transactionService;
        this.axiosConnection = (0, connection_1["default"])();
    }
    // Create payment Ref (initialize transaction)
    PaystackBrokerService.prototype.createPayRef = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, cartItems;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        payload = {
                            email: user.email,
                            amount: 0
                        };
                        return [4 /*yield*/, this.cartService.getCartItems(user)];
                    case 1:
                        cartItems = _a.sent();
                        // console.log(cartItems.length);
                        if (cartItems.length === 0) {
                            throw new common_1.NotFoundException('you must have item(s) in your cart before creating a payment');
                        }
                        //compute the total price of all cart items
                        return [4 /*yield*/, Promise.all(cartItems.map(function (item) {
                                payload.amount += item.total;
                            }))];
                    case 2:
                        //compute the total price of all cart items
                        _a.sent();
                        // set payload amount to the smallest decimal
                        payload.amount = payload.amount * 100;
                        return [4 /*yield*/, this.axiosConnection
                                .post('/transaction/initialize', payload)
                                .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0: 
                                        // create transaction on payment initalize
                                        return [4 /*yield*/, this.transactionService.createTransaction((_a = res.data) === null || _a === void 0 ? void 0 : _a.data.reference, user, (_b = res.data) === null || _b === void 0 ? void 0 : _b.message)];
                                        case 1:
                                            // create transaction on payment initalize
                                            _c.sent();
                                            return [2 /*return*/, res.data.data];
                                    }
                                });
                            }); })["catch"](function (err) {
                                throw new common_1.HttpException(err.message, err.statusCode || 500);
                            })];
                    case 3: 
                    // initialize transaction
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PaystackBrokerService.prototype.createRefund = function (transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var refund;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.axiosConnection.post('/refund', { transaction: transaction })];
                    case 1:
                        refund = _a.sent();
                        return [2 /*return*/, { data: refund.data }];
                }
            });
        });
    };
    PaystackBrokerService.prototype.handleGetPayRecord = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.paymentRepository.findOne({ where: { id: id } })];
                    case 1:
                        record = _a.sent();
                        if (!record) {
                            throw new common_1.NotFoundException("payment record for ".concat(id, " not found"));
                        }
                        return [2 /*return*/, record];
                }
            });
        });
    };
    // checks if the pay ref exists in  the database already
    PaystackBrokerService.prototype.checkIfPayRefExists = function (ref) {
        return __awaiter(this, void 0, void 0, function () {
            var payRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.paymentRepository.findOne({
                            where: { reference: ref }
                        })];
                    case 1:
                        payRef = _a.sent();
                        if (payRef) {
                            throw new common_1.ConflictException('A record is already associated with this payment reference');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PaystackBrokerService.prototype.handleRemovePaymentRecord = function (recordId) {
        return __awaiter(this, void 0, void 0, function () {
            var record, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.handleGetPayRecord(recordId)];
                    case 1:
                        record = _a.sent();
                        return [4 /*yield*/, this.paymentRepository["delete"](recordId)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, record];
                    case 3:
                        err_1 = _a.sent();
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PaystackBrokerService.prototype.handleGetARecord = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var record, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.paymentRepository.findOne({
                                where: {
                                    id: id
                                },
                                relations: {
                                    product: true
                                }
                            })];
                    case 1:
                        record = _a.sent();
                        if (!record) {
                            throw new common_1.NotFoundException('no record found');
                        }
                        return [2 /*return*/, record];
                    case 2:
                        err_2 = _a.sent();
                        throw err_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PaystackBrokerService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.PaymentReceipt))
    ], PaystackBrokerService);
    return PaystackBrokerService;
}());
exports.PaystackBrokerService = PaystackBrokerService;
