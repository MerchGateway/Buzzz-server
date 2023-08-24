"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.AdminService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var common_2 = require("@nestjs/common");
var logistics_partner_entity_1 = require("./logistics-partners/entities/logistics-partner.entity");
var printing_partner_entity_1 = require("./printing-partners/entities/printing-partner.entity");
var order_1 = require("../../../../../../../../src/types/order");
var user_entity_1 = require("../users/entities/user.entity");
var status_1 = require("../../types/status");
var response_1 = require("../../../../../../../../src/utils/response");
var general_1 = require("../../../../../../../../src/types/general");
var order_entity_1 = require("../order/entities/order.entity");
var AdminService = /** @class */ (function () {
    function AdminService(printingPartnerRepository, logisticsPartnerRepository, userRepository, orderRepository) {
        this.printingPartnerRepository = printingPartnerRepository;
        this.logisticsPartnerRepository = logisticsPartnerRepository;
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
    }
    AdminService.prototype.createPrintingPartner = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var printingPartner, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        printingPartner = this.printingPartnerRepository.create(data);
                        return [4 /*yield*/, this.printingPartnerRepository.save(printingPartner)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_1 = _a.sent();
                        throw new common_2.HttpException(err_1.message, err_1.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminService.prototype.createLogisticPartner = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var logisticsPartner, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        logisticsPartner = this.logisticsPartnerRepository.create(data);
                        return [4 /*yield*/, this.logisticsPartnerRepository.save(logisticsPartner)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_2 = _a.sent();
                        throw new common_2.HttpException(err_2.message, err_2.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminService.prototype.editPrintingPartner = function (data, id) {
        return __awaiter(this, void 0, void 0, function () {
            var isPrintingPartner, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.printingPartnerRepository.findOneBy({
                                id: id
                            })];
                    case 1:
                        isPrintingPartner = _a.sent();
                        if (!isPrintingPartner) {
                            throw new common_1.NotFoundException("printing partner with id ".concat(id, " does  not exist"));
                        }
                        return [4 /*yield*/, this.printingPartnerRepository.save(__assign(__assign({}, isPrintingPartner), data))];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_3 = _a.sent();
                        throw new common_2.HttpException(err_3.message, err_3.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdminService.prototype.editLogisticsPartner = function (data, id) {
        return __awaiter(this, void 0, void 0, function () {
            var isLogisticsPartner, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.logisticsPartnerRepository.findOneBy({
                                id: id
                            })];
                    case 1:
                        isLogisticsPartner = _a.sent();
                        if (!isLogisticsPartner) {
                            throw new common_1.NotFoundException("logistics partner with id ".concat(id, " does  not exist"));
                        }
                        return [4 /*yield*/, this.logisticsPartnerRepository.save(__assign(__assign({}, isLogisticsPartner), data))];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_4 = _a.sent();
                        throw new common_2.HttpException(err_4.message, err_4.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdminService.prototype.getAllPrintingPartners = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.printingPartnerRepository.find({
                                relations: ['administrators']
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_5 = _a.sent();
                        throw new common_2.HttpException(err_5.message, err_5.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminService.prototype.getAllLogisticsPartners = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.logisticsPartnerRepository.find({
                                relations: ['administrators']
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_6 = _a.sent();
                        throw new common_2.HttpException(err_6.message, err_6.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminService.prototype.getSinglePrintingPartner = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var printingPartner, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.printingPartnerRepository.findOne({
                                where: {
                                    id: id
                                },
                                relations: ['administrators']
                            })];
                    case 1:
                        printingPartner = _a.sent();
                        if (!printingPartner) {
                            throw new common_1.NotFoundException("printing partner with id ".concat(id, " does  not exist"));
                        }
                        return [2 /*return*/, printingPartner];
                    case 2:
                        err_7 = _a.sent();
                        throw new common_2.HttpException(err_7.message, err_7.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminService.prototype.getSingleLogisticsPartner = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var logisticsPartner, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.logisticsPartnerRepository.findOne({
                                where: {
                                    id: id
                                },
                                relations: ['administrators']
                            })];
                    case 1:
                        logisticsPartner = _a.sent();
                        if (!logisticsPartner) {
                            throw new common_1.NotFoundException("logistics partner with id ".concat(id, " does  not exist"));
                        }
                        return [2 /*return*/, logisticsPartner];
                    case 2:
                        err_8 = _a.sent();
                        throw new common_2.HttpException(err_8.message, err_8.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminService.prototype.togglePrintingPartnerStatus = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var printingPartner, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.printingPartnerRepository.findOneBy({
                                id: id
                            })];
                    case 1:
                        printingPartner = _a.sent();
                        if (!printingPartner) {
                            throw new common_1.NotFoundException("printing partner with id ".concat(id, " does  not exist"));
                        }
                        return [4 /*yield*/, this.printingPartnerRepository.save(__assign(__assign({}, printingPartner), { status: data.status }))];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_9 = _a.sent();
                        throw new common_2.HttpException(err_9.message, err_9.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdminService.prototype.toggleLogisticsPartnerStatus = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var logisticsPartner, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.logisticsPartnerRepository.findOneBy({
                                id: id
                            })];
                    case 1:
                        logisticsPartner = _a.sent();
                        if (!logisticsPartner) {
                            throw new common_1.NotFoundException("logistics partner with id ".concat(id, " does  not exist"));
                        }
                        return [4 /*yield*/, this.logisticsPartnerRepository.save(__assign(__assign({}, logisticsPartner), { status: data.status }))];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_10 = _a.sent();
                        throw new common_2.HttpException(err_10.message, err_10.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdminService.prototype.editPrintingAdmin = function (data, id) {
        return __awaiter(this, void 0, void 0, function () {
            var printingAdmin, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.userRepository.findOneBy({
                                id: id,
                                role: general_1.Role.PRINTING_ADMIN
                            })];
                    case 1:
                        printingAdmin = _a.sent();
                        if (!printingAdmin) {
                            throw new common_1.NotFoundException("printing admin with id ".concat(id, " does  not exist"));
                        }
                        return [4 /*yield*/, this.userRepository.update(id, data)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_11 = _a.sent();
                        throw new common_2.HttpException(err_11.message, err_11.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdminService.prototype.editLogisticsAdmin = function (data, id) {
        return __awaiter(this, void 0, void 0, function () {
            var logisticsAdmin, err_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.userRepository.findOneBy({
                                id: id,
                                role: general_1.Role.LOGISTIC_ADMIN
                            })];
                    case 1:
                        logisticsAdmin = _a.sent();
                        if (!logisticsAdmin) {
                            throw new common_1.NotFoundException("logistics admin with id ".concat(id, " does  not exist"));
                        }
                        return [4 /*yield*/, this.userRepository.update(id, data)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_12 = _a.sent();
                        throw new common_2.HttpException(err_12.message, err_12.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdminService.prototype.deletePrintingPartner = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var printingPartner, err_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.printingPartnerRepository.findOneBy({
                                id: id
                            })];
                    case 1:
                        printingPartner = _a.sent();
                        if (!printingPartner) {
                            throw new common_1.NotFoundException("printing partner with id ".concat(id, " does  not exist"));
                        }
                        return [4 /*yield*/, this.userRepository["delete"](id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, new response_1.SuccessResponse({}, "printing partner with id ".concat(id, " deleted successfully"))];
                    case 3:
                        err_13 = _a.sent();
                        throw new common_2.HttpException(err_13.message, err_13.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdminService.prototype.deleteLogisticsPartner = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var logisticsPartner, err_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.logisticsPartnerRepository.findOneBy({
                                id: id
                            })];
                    case 1:
                        logisticsPartner = _a.sent();
                        if (!logisticsPartner) {
                            throw new common_1.NotFoundException("logistics partner with id ".concat(id, " does  not exist"));
                        }
                        return [4 /*yield*/, this.userRepository["delete"](id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, new response_1.SuccessResponse({}, "logistics partner with id ".concat(id, " deleted successfully"))];
                    case 3:
                        err_14 = _a.sent();
                        throw new common_2.HttpException(err_14.message, err_14.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdminService.prototype.createLogisticsAdmin = function (data, id) {
        return __awaiter(this, void 0, void 0, function () {
            var isLogisticsPartner, logisticsAdmin, err_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getSingleLogisticsPartner(id)];
                    case 1:
                        isLogisticsPartner = _a.sent();
                        logisticsAdmin = this.userRepository.create({
                            email: data.email,
                            role: general_1.Role.LOGISTIC_ADMIN,
                            password: data.password,
                            logistics_partner: isLogisticsPartner
                        });
                        return [4 /*yield*/, this.userRepository.save(logisticsAdmin)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_15 = _a.sent();
                        throw new common_2.HttpException(err_15.message, err_15.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdminService.prototype.createPrintingAdmin = function (data, id) {
        return __awaiter(this, void 0, void 0, function () {
            var isPrintingPartner, printingsAdmin, err_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getSinglePrintingPartner(id)];
                    case 1:
                        isPrintingPartner = _a.sent();
                        console.log(isPrintingPartner);
                        printingsAdmin = this.userRepository.create({
                            email: data.email,
                            role: general_1.Role.PRINTING_ADMIN,
                            password: data.password,
                            printing_partner: isPrintingPartner
                        });
                        return [4 /*yield*/, this.userRepository.save(printingsAdmin)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_16 = _a.sent();
                        throw new common_2.HttpException(err_16.message, err_16.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdminService.prototype.viewAllPrintingAdmins = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository.find({
                                where: { role: general_1.Role.PRINTING_ADMIN },
                                relations: ['printing_partner']
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_17 = _a.sent();
                        throw new common_2.HttpException(err_17.message, err_17.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminService.prototype.viewAllLogisticsAdmins = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository.find({
                                where: { role: general_1.Role.LOGISTIC_ADMIN },
                                relations: ['logistics_partner']
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_18 = _a.sent();
                        throw new common_2.HttpException(err_18.message, err_18.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminService.prototype.viewAllOrdersAssignedToLogisticsPartner = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var logisticsPartner, err_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.logisticsPartnerRepository.findOneBy({
                                id: id
                            })];
                    case 1:
                        logisticsPartner = _a.sent();
                        if (!logisticsPartner) {
                            throw new common_1.NotFoundException("logistics partner with id ".concat(id, " does  not exist"));
                        }
                        return [2 /*return*/, logisticsPartner.orders];
                    case 2:
                        err_19 = _a.sent();
                        throw new common_2.HttpException(err_19.message, err_19.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminService.prototype.viewAllOrdersAssignedToPrintingPartner = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var printingPartner, err_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.printingPartnerRepository.findOneBy({
                                id: id
                            })];
                    case 1:
                        printingPartner = _a.sent();
                        if (!printingPartner) {
                            throw new common_1.NotFoundException("printing partner with id ".concat(id, " does  not exist"));
                        }
                        return [2 /*return*/, printingPartner.orders];
                    case 2:
                        err_20 = _a.sent();
                        throw new common_2.HttpException(err_20.message, err_20.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminService.prototype.AssignOrdersToPrintingPartner = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var printingPartner_1, orders, err_21;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.printingPartnerRepository.findOneBy({
                                id: data.printingPartner,
                                status: status_1.Status.ENABLED
                            })];
                    case 1:
                        printingPartner_1 = _a.sent();
                        if (!printingPartner_1) {
                            throw new common_1.NotFoundException("printing  partner with id ".concat(data.printingPartner, " does  not exist or  disabled"));
                        }
                        return [4 /*yield*/, Promise.all(data.orders.map(function (id) { return __awaiter(_this, void 0, void 0, function () {
                                var isOrderPaid;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.orderRepository.findOneBy({
                                                id: id,
                                                status: order_1.Status.PAID
                                            })];
                                        case 1:
                                            isOrderPaid = _a.sent();
                                            if (!isOrderPaid) return [3 /*break*/, 3];
                                            isOrderPaid.printing_partner = printingPartner_1;
                                            return [4 /*yield*/, this.orderRepository.save(isOrderPaid)];
                                        case 2: return [2 /*return*/, _a.sent()];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 2:
                        orders = _a.sent();
                        if (!orders[0]) {
                            throw new common_1.BadRequestException('order(s) have not been paid for  or does not exist');
                        }
                        return [2 /*return*/, orders];
                    case 3:
                        err_21 = _a.sent();
                        throw new common_2.HttpException(err_21.message, err_21.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdminService.prototype.AssignOrdersToLogisticsPartner = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var logisticsPartner_1, orders, err_22;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.logisticsPartnerRepository.findOneBy({
                                id: data.logisticsPartner,
                                status: status_1.Status.ENABLED
                            })];
                    case 1:
                        logisticsPartner_1 = _a.sent();
                        if (!logisticsPartner_1) {
                            throw new common_1.NotFoundException("logistics with id ".concat(data.logisticsPartner, " does  not exist or  disabled"));
                        }
                        return [4 /*yield*/, Promise.all(data.orders.map(function (id) { return __awaiter(_this, void 0, void 0, function () {
                                var isOrderPrinted;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.orderRepository.findOneBy({
                                                id: id,
                                                status: order_1.Status.PRINTED
                                            })];
                                        case 1:
                                            isOrderPrinted = _a.sent();
                                            console.log(isOrderPrinted);
                                            if (!isOrderPrinted) return [3 /*break*/, 3];
                                            isOrderPrinted.logistics_partner = logisticsPartner_1;
                                            return [4 /*yield*/, this.orderRepository.save(isOrderPrinted)];
                                        case 2: return [2 /*return*/, _a.sent()];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 2:
                        orders = _a.sent();
                        if (!orders[0]) {
                            throw new common_1.BadRequestException('order(s)  have not been printed  or does not exist');
                        }
                        return [2 /*return*/, orders];
                    case 3:
                        err_22 = _a.sent();
                        throw new common_2.HttpException(err_22.message, err_22.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdminService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(printing_partner_entity_1.PrintingPartner)),
        __param(1, (0, typeorm_1.InjectRepository)(logistics_partner_entity_1.LogisticsPartner)),
        __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
        __param(3, (0, typeorm_1.InjectRepository)(order_entity_1.Order))
    ], AdminService);
    return AdminService;
}());
exports.AdminService = AdminService;
