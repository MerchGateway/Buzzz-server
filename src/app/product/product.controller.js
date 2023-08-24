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
exports.ProductController = void 0;
var common_1 = require("@nestjs/common");
var constant_1 = require("../../constant");
var platform_express_1 = require("@nestjs/platform-express");
var product_service_1 = require("./product.service");
var category_service_1 = require("../category/category.service");
var public_decorator_1 = require("../../../../../../../../src/decorators/public.decorator");
var ProductController = /** @class */ (function () {
    function ProductController(categoryService, service) {
        this.categoryService = categoryService;
        this.service = service;
    }
    // @Post('create-new')
    // public async createProduct(
    //   @CurrentUser() user: User,
    //   @Body() body: CreateProductDto,
    // ): Promise<Product> {
    //   await this.categoryService.getCategory(body.categoryId);
    //   return this.service.createProduct(body, user);
    // }
    ProductController.prototype.uploadFile = function (files) {
        console.log(files);
    };
    ProductController.prototype.setVisibility = function (id) {
        return this.service.handleSetVisibility(id);
    };
    ProductController.prototype.editProduct = function (body, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!body.categoryId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.categoryService.getCategory(body.categoryId)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.service.handleEditProduct(body, id)];
                }
            });
        });
    };
    //seach or filter product by price || name || or any other field that would be added
    ProductController.prototype.queryProducts = function (page, limit, searchQuery) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        return this.service.handleQueryProducts({
            limit: limit,
            page: page,
            route: "".concat(constant_1.BASE_URL, "/product/search")
        }, searchQuery);
    };
    ProductController.prototype.getAProduct = function (id) {
        return this.service.handleGetAProduct(id);
    };
    ProductController.prototype.getAllProducts = function (page, limit) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        limit = limit > 100 ? 100 : limit < 10 ? 10 : limit;
        return this.service.handleGetAllProducts({
            page: page,
            limit: limit,
            route: "".concat(constant_1.BASE_URL, "/product")
        });
    };
    ProductController.prototype.deleteAProduct = function (id) {
        return this.service.handleDeleteAProduct(id);
    };
    __decorate([
        (0, common_1.Post)('upload'),
        (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
            { name: 'pic_1', maxCount: 1 },
            { name: 'pic_2', maxCount: 1 },
        ])),
        __param(0, (0, common_1.UploadedFiles)())
    ], ProductController.prototype, "uploadFile");
    __decorate([
        (0, common_1.Put)('set-visibility/:id'),
        __param(0, (0, common_1.Param)('id'))
    ], ProductController.prototype, "setVisibility");
    __decorate([
        (0, common_1.Put)('edit/:id'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Param)('id'))
    ], ProductController.prototype, "editProduct");
    __decorate([
        (0, public_decorator_1.Public)(),
        (0, common_1.Get)('search'),
        __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
        __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
        __param(2, (0, common_1.Query)())
    ], ProductController.prototype, "queryProducts");
    __decorate([
        (0, public_decorator_1.Public)(),
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], ProductController.prototype, "getAProduct");
    __decorate([
        (0, public_decorator_1.Public)(),
        (0, common_1.Get)(),
        __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
        __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe))
    ], ProductController.prototype, "getAllProducts");
    __decorate([
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], ProductController.prototype, "deleteAProduct");
    ProductController = __decorate([
        (0, common_1.Controller)('product'),
        __param(0, (0, common_1.Inject)(category_service_1.CategoryService)),
        __param(1, (0, common_1.Inject)(product_service_1.ProductService))
    ], ProductController);
    return ProductController;
}());
exports.ProductController = ProductController;
