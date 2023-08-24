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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.DesignService = void 0;
var typeorm_1 = require("@nestjs/typeorm");
var common_1 = require("@nestjs/common");
var design_entity_1 = require("./entities/design.entity");
var bull_1 = require("@nestjs/bull");
var response_1 = require("../../utils/response");
var polymailer_content_entity_1 = require("../order/entities/polymailer_content.entity");
var common_2 = require("@nestjs/common");
var constant_1 = require("../../constant");
var constant_2 = require("../../constant");
var errors_1 = require("@nestjs/websockets/errors");
var DesignService = /** @class */ (function () {
    function DesignService(queue, designRepository, cartService, productService, paystackBrokerService, imageStorage, polyMailerContentRepository) {
        this.queue = queue;
        this.designRepository = designRepository;
        this.cartService = cartService;
        this.productService = productService;
        this.paystackBrokerService = paystackBrokerService;
        this.imageStorage = imageStorage;
        this.polyMailerContentRepository = polyMailerContentRepository;
    }
    DesignService.prototype.viewAllDesigns = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.designRepository.find({
                                where: { owner: { id: user.id } }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_1 = _a.sent();
                        throw new common_1.HttpException(err_1.message, err_1.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DesignService.prototype.fetchLatestDesignForCurrentUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var design, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.designRepository.findOne({
                                where: { owner: { id: user.id }, published: false }
                            })];
                    case 1:
                        design = _a.sent();
                        console.log(design);
                        return [2 /*return*/, { design: design }];
                    case 2:
                        err_2 = _a.sent();
                        throw new common_1.HttpException(err_2.message, err_2.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DesignService.prototype.fetchSingleDesign = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var design, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.designRepository.findOne({ where: { id: id } })];
                    case 1:
                        design = _a.sent();
                        if (!design) {
                            throw new common_1.NotFoundException("design with id ".concat(id, "  does  not exist or  deleted"));
                        }
                        return [2 /*return*/, design];
                    case 2:
                        err_3 = _a.sent();
                        throw new common_1.HttpException(err_3.message, err_3.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DesignService.prototype.sortAssets = function (design, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _i, i, image, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 8, , 9]);
                        _a = [];
                        for (_b in payload.objects)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        i = _a[_i];
                        if (!(payload.objects[i].type === constant_2.TEXT_TYPE)) return [3 /*break*/, 2];
                        design.texts = __spreadArray(__spreadArray([], design.texts, true), [payload.objects[i].text], false);
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(payload.objects[i].type === constant_2.IMAGE_TYPE)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.imageStorage.uploadPhoto(payload.objects[i].src, {
                                asset_folder: design.owner ? design.owner.username : 'no_auth',
                                public_id_prefix: design.owner
                                    ? design.owner.username
                                    : 'no_auth'
                            })];
                    case 3:
                        image = _c.sent();
                        design.images.push({
                            public_id: image.public_id,
                            url: image.secure_url
                        });
                        // update image scr from design with online link  to be saved
                        payload.objects[i].src = image.secure_url;
                        return [3 /*break*/, 5];
                    case 4:
                        console.log('another kind of asset');
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6:
                        design.design_data = payload;
                        console.log(design);
                        return [4 /*yield*/, this.designRepository.save(design)];
                    case 7:
                        design = _c.sent();
                        console.log(design);
                        return [2 /*return*/, design];
                    case 8:
                        error_1 = _c.sent();
                        console.log(error_1);
                        throw new errors_1.WsException(error_1.message);
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    DesignService.prototype.design = function (payload, user, id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('entered design');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.queue.add(constant_1.DESIGN_MERCH, { user: user, payload: payload, id: id })];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_2 = _a.sent();
                        throw new errors_1.WsException(error_2.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DesignService.prototype.fetchMyDesign = function (id, user) {
        return __awaiter(this, void 0, void 0, function () {
            var design, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.designRepository.findOne({
                                where: { id: id, owner: { id: user.id } }
                            })];
                    case 1:
                        design = _a.sent();
                        if (!design) {
                            throw new common_1.NotFoundException("design with id ".concat(id, "  does  not exist or  deleted"));
                        }
                        return [2 /*return*/, design];
                    case 2:
                        err_4 = _a.sent();
                        throw new common_1.HttpException(err_4.message, err_4.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DesignService.prototype.addContributorsToDesign = function (payload, user) {
        return __awaiter(this, void 0, void 0, function () {
            var isDesign, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.fetchMyDesign(payload.id, user)];
                    case 1:
                        isDesign = _a.sent();
                        isDesign.contributors = __spreadArray(__spreadArray([], isDesign.contributors, true), payload.emails, true);
                        return [4 /*yield*/, this.designRepository.save(isDesign)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, new response_1.SuccessResponse(payload.emails, 'Contributor(s) added to design')];
                    case 3:
                        err_5 = _a.sent();
                        throw new common_1.HttpException(err_5.message, err_5.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DesignService.prototype.removeContributorsToDesign = function (payload, user) {
        return __awaiter(this, void 0, void 0, function () {
            var isDesign, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.fetchMyDesign(payload.id, user)];
                    case 1:
                        isDesign = _a.sent();
                        isDesign.contributors = isDesign.contributors.filter(function (contributor) {
                            if (!payload.emails.includes(contributor) ||
                                user.email === contributor) {
                                return contributor;
                            }
                        });
                        return [4 /*yield*/, this.designRepository.save(isDesign)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, new response_1.SuccessResponse(payload.emails, 'Contributor(s) removed from design')];
                    case 3:
                        err_6 = _a.sent();
                        throw new common_1.HttpException(err_6.message, err_6.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DesignService.prototype.deleteDesignForCurrentUser = function (user, id) {
        return __awaiter(this, void 0, void 0, function () {
            var design, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.designRepository.findOne({
                                where: {
                                    id: id,
                                    owner: {
                                        id: user.id
                                    }
                                }
                            })];
                    case 1:
                        design = _a.sent();
                        if (!design) {
                            throw new common_1.NotFoundException("Design for current user does not exist");
                        }
                        if (design.published == true) {
                            throw new common_1.NotFoundException("You cannot delete an already published  design");
                        }
                        design.remove();
                        return [2 /*return*/, new response_1.SuccessResponse(design, 'Design for current user deleted', common_1.HttpStatus.ACCEPTED)];
                    case 2:
                        err_7 = _a.sent();
                        throw new common_1.HttpException(err_7.message, err_7.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DesignService.prototype.deleteSingleDesign = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var design, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.designRepository.findOneBy({ id: id })];
                    case 1:
                        design = _a.sent();
                        if (!design) {
                            throw new common_1.NotFoundException("Design with id ".concat(id, " does not exist "));
                        }
                        if (design.published == true) {
                            throw new common_1.NotFoundException("Design already published as a product and might be present in pending orders");
                        }
                        return [2 /*return*/, new response_1.SuccessResponse(design, "Design with id ".concat(id, " deleted successfully "), common_1.HttpStatus.OK)];
                    case 2:
                        err_8 = _a.sent();
                        throw new common_1.HttpException(err_8.message, err_8.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DesignService.prototype.publishDesign = function (user, payload, id, category_id) {
        return __awaiter(this, void 0, void 0, function () {
            var design, product, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.fetchMyDesign(id, user)];
                    case 1:
                        design = _a.sent();
                        console.log(design);
                        if (design.published == true) {
                            throw new common_1.ConflictException('design already published');
                        }
                        return [4 /*yield*/, this.productService.createProduct({
                                name: payload.title,
                                price: payload.price,
                                description: payload.description,
                                categoryId: category_id
                            }, user)];
                    case 2:
                        product = _a.sent();
                        (product.isPublished = true), (design.product = product);
                        design.published = true;
                        return [4 /*yield*/, this.designRepository.save(design)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, product];
                    case 4:
                        err_9 = _a.sent();
                        throw new common_1.HttpException(err_9.message, err_9.status);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DesignService.prototype.publishDesignAndCheckout = function (user, payload, id, category_id) {
        return __awaiter(this, void 0, void 0, function () {
            var product, generatePaymentRef, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.publishDesign(user, payload, id, category_id)];
                    case 1:
                        product = _a.sent();
                        //   save product to cart
                        return [4 /*yield*/, this.cartService.createCartItem({
                                product: product.id,
                                quantity: payload.quantity,
                                color: payload === null || payload === void 0 ? void 0 : payload.color,
                                size: payload === null || payload === void 0 ? void 0 : payload.size
                            }, user)];
                    case 2:
                        //   save product to cart
                        _a.sent();
                        return [4 /*yield*/, this.paystackBrokerService.createPayRef(user)];
                    case 3:
                        generatePaymentRef = _a.sent();
                        return [2 /*return*/, generatePaymentRef];
                    case 4:
                        err_10 = _a.sent();
                        throw new common_1.HttpException(err_10.message, err_10.status);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DesignService.prototype.createPolymailerContent = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var polymailers;
            return __generator(this, function (_a) {
                try {
                    polymailers = this.polyMailerContentRepository.create(payload);
                    console.log(polymailers);
                    return [2 /*return*/, polymailers];
                }
                catch (err) {
                    throw new common_1.HttpException(err.message, err.status);
                }
                return [2 /*return*/];
            });
        });
    };
    DesignService.prototype.fetchPolymailerContents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('e reach here');
                        return [4 /*yield*/, this.polyMailerContentRepository.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_11 = _a.sent();
                        throw new common_1.HttpException(err_11.message, err_11.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DesignService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, bull_1.InjectQueue)(constant_1.EVENT_QUEUE)),
        __param(1, (0, typeorm_1.InjectRepository)(design_entity_1.Design)),
        __param(5, (0, common_2.Inject)(constant_1.CLOUDINARY)),
        __param(6, (0, typeorm_1.InjectRepository)(polymailer_content_entity_1.PolyMailerContent))
    ], DesignService);
    return DesignService;
}());
exports.DesignService = DesignService;
