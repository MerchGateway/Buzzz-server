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
exports.ProductService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
var product_entity_1 = require("./product.entity");
var ProductService = /** @class */ (function () {
    function ProductService(productRepository) {
        this.productRepository = productRepository;
    }
    ProductService.prototype.createProduct = function (body, user) {
        var product = new product_entity_1.Product();
        product.name = body.name;
        product.price = body.price;
        product.categoryId = body.categoryId;
        product.seller = user;
        product.sellerId = user.id;
        product.description = body.description;
        return this.productRepository.save(product);
    };
    ProductService.prototype.handleEditProduct = function (body, id) {
        return __awaiter(this, void 0, void 0, function () {
            var product, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.handleGetAProduct(id)];
                    case 1:
                        product = _a.sent();
                        return [4 /*yield*/, this.productRepository
                                .createQueryBuilder('updateP')
                                .update()
                                .where('id= :id', { id: product.id })
                                .set({
                                name: body.name,
                                price: body.price,
                                categoryId: body.categoryId,
                                description: body.description
                            })
                                .execute()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.handleGetAProduct(id)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        err_1 = _a.sent();
                        throw err_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProductService.prototype.handleUpdatePaymentRecord = function (receiptId, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.productRepository
                            .createQueryBuilder('addPayrecord')
                            .update()
                            .where('id= :id', { id: id })
                            .set({
                            receiptId: receiptId,
                            purchased: true
                        })
                            .execute()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.handleGetAProduct(id)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductService.prototype.handleSetVisibility = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var product, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.handleGetAProduct(id)];
                    case 1:
                        product = _a.sent();
                        product.isPublished = !product.isPublished;
                        return [4 /*yield*/, product.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, product];
                    case 3:
                        err_2 = _a.sent();
                        throw err_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductService.prototype.handleQueryProducts = function (_a, searchQuery) {
        var limit = _a.limit, page = _a.page, route = _a.route;
        return __awaiter(this, void 0, void 0, function () {
            var searchResult;
            return __generator(this, function (_b) {
                searchResult = this.productRepository
                    .createQueryBuilder('product')
                    .where('product.name = :name OR product.price = :price OR product.sellerId= :sellerId OR seller.username= :username ', {
                    name: searchQuery === null || searchQuery === void 0 ? void 0 : searchQuery.name,
                    price: searchQuery === null || searchQuery === void 0 ? void 0 : searchQuery.price,
                    sellerId: searchQuery === null || searchQuery === void 0 ? void 0 : searchQuery.sellerId,
                    username: searchQuery === null || searchQuery === void 0 ? void 0 : searchQuery.username
                });
                return [2 /*return*/, (0, nestjs_typeorm_paginate_1.paginate)(searchResult, { limit: limit, page: page, route: route })];
            });
        });
    };
    ProductService.prototype.handleGetAProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var product, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.productRepository.findOne({
                                where: { id: id },
                                relations: {
                                    receipt: true
                                }
                            })];
                    case 1:
                        product = _a.sent();
                        if (!product) {
                            throw new common_1.NotFoundException('No product with this credentail(s) found');
                        }
                        return [2 /*return*/, product];
                    case 2:
                        err_3 = _a.sent();
                        throw err_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductService.prototype.handleGetAllProducts = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var fetch;
            return __generator(this, function (_a) {
                fetch = this.productRepository.createQueryBuilder('p');
                fetch.orderBy('p.createdAt', 'ASC');
                return [2 /*return*/, (0, nestjs_typeorm_paginate_1.paginate)(fetch, options)];
            });
        });
    };
    ProductService.prototype.handleDeleteAProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var product, deleteProd, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.handleGetAProduct(id)];
                    case 1:
                        product = _a.sent();
                        if (!product) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.productRepository.remove(product)];
                    case 2:
                        deleteProd = _a.sent();
                        return [2 /*return*/, deleteProd];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_4 = _a.sent();
                        throw err_4;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProductService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product))
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
