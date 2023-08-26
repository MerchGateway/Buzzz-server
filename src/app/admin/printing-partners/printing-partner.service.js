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
exports.PrintingPartnerService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var printing_partner_entity_1 = require("./entities/printing-partner.entity");
var user_entity_1 = require("../../users/entities/user.entity");
var common_2 = require("@nestjs/common");
var order_entity_1 = require("../../order/entities/order.entity");
var PrintingPartnerService = /** @class */ (function () {
    function PrintingPartnerService(printingPartnerRepository, orderRepository, userRepository, orderService) {
        this.printingPartnerRepository = printingPartnerRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.orderService = orderService;
    }
    PrintingPartnerService.prototype.getOrders = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var userWithPrintingRelation, orders, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { id: user.id },
                                relations: ['printing_partner']
                            })];
                    case 1:
                        userWithPrintingRelation = _a.sent();
                        return [4 /*yield*/, this.orderRepository
                                .createQueryBuilder('order')
                                .leftJoin('order.printing_partner', 'printing_partner')
                                .leftJoinAndSelect('order.product', 'product')
                                .select('product.design')
                                .select('product.thumbnail')
                                .addSelect('quantity')
                                .addSelect('polymailer_details')
                                .addSelect('order.status', 'status')
                                .where('printing_partner.id=:printing_partner', {
                                printing_partner: userWithPrintingRelation.printing_partner.id
                            })
                                .getRawMany()];
                    case 2:
                        orders = _a.sent();
                        return [2 /*return*/, orders];
                    case 3:
                        err_1 = _a.sent();
                        throw new common_2.HttpException(err_1.message, err_1.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PrintingPartnerService.prototype.viewOrder = function (user, id) {
        return __awaiter(this, void 0, void 0, function () {
            var userWithPartner, order, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { id: user.id },
                                relations: { printing_partner: true }
                            })];
                    case 1:
                        userWithPartner = _a.sent();
                        return [4 /*yield*/, this.orderRepository.findOne({
                                where: {
                                    id: id,
                                    printing_partner: { id: userWithPartner.printing_partner.id }
                                },
                                relations: { printing_partner: true }
                            })];
                    case 2:
                        order = _a.sent();
                        if (!order) {
                            throw new common_1.NotFoundException(" order with id ".concat(id, " does  not  exist or isnt asigned to you"));
                        }
                        return [2 /*return*/, {
                                design: order.product.design,
                                thumbnail: order.product.thumbnail,
                                quantity: order.quantity,
                                status: order.status,
                                polymailer_details: order.polymailer_details
                            }];
                    case 3:
                        err_2 = _a.sent();
                        user;
                        throw new common_2.HttpException(err_2.message, err_2.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PrintingPartnerService.prototype.viewPackagingContent = function (user, id) {
        return __awaiter(this, void 0, void 0, function () {
            var order, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.viewOrder(user, id)];
                    case 1:
                        order = _a.sent();
                        return [2 /*return*/, { polymailer_details: order.polymailer_details }];
                    case 2:
                        err_3 = _a.sent();
                        throw new common_2.HttpException(err_3.message, err_3.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PrintingPartnerService.prototype.viewDesign = function (user, id) {
        return __awaiter(this, void 0, void 0, function () {
            var order, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.viewOrder(user, id)];
                    case 1:
                        order = _a.sent();
                        return [2 /*return*/, { design: order.design }];
                    case 2:
                        err_4 = _a.sent();
                        throw new common_2.HttpException(err_4.message, err_4.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PrintingPartnerService.prototype.updateStatus = function (user, body, id) {
        return __awaiter(this, void 0, void 0, function () {
            var userWithPartner, allowedStatuses, order, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { id: user.id },
                                relations: { printing_partner: true }
                            })];
                    case 1:
                        userWithPartner = _a.sent();
                        allowedStatuses = ['In-Progress', 'Printed'];
                        if (!allowedStatuses.includes(body.status)) {
                            throw new common_1.UnauthorizedException('Printing partner  only allowed  to set status  to "In  Progress" or "Printed" ');
                        }
                        return [4 /*yield*/, this.orderRepository.findOne({
                                where: { id: id },
                                relations: ['printing_partner']
                            })];
                    case 2:
                        order = _a.sent();
                        console.log(order.printing_partner);
                        if (!order.printing_partner ||
                            order.printing_partner.id !== userWithPartner.printing_partner.id) {
                            throw new common_1.UnauthorizedException('This order hasnt been assigned to you');
                        }
                        return [4 /*yield*/, this.orderRepository.update(id, { status: body.status })];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        err_5 = _a.sent();
                        throw new common_2.HttpException(err_5.message, err_5.status);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PrintingPartnerService.prototype.downloadDesign = function (user, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, 'downloads  a design  '];
                }
                catch (err) {
                    throw new common_2.HttpException(err.message, err.status);
                }
                return [2 /*return*/];
            });
        });
    };
    PrintingPartnerService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(printing_partner_entity_1.PrintingPartner)),
        __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
        __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User))
    ], PrintingPartnerService);
    return PrintingPartnerService;
}());
exports.PrintingPartnerService = PrintingPartnerService;
