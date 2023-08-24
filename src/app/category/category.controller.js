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
exports.__esModule = true;
exports.CategoryController = void 0;
var common_1 = require("@nestjs/common");
var public_decorator_1 = require("../../../../../../../../src/decorators/public.decorator");
var roles_decorator_1 = require("../../../../../../../../src/decorators/roles.decorator");
var general_1 = require("../../../../../../../../src/types/general");
var roles_guard_1 = require("../auth/guards/roles.guard");
var CategoryController = /** @class */ (function () {
    function CategoryController(categoryService) {
        this.categoryService = categoryService;
    }
    CategoryController.prototype.createCategory = function (payload) {
        return this.categoryService.createCategory(payload);
    };
    CategoryController.prototype.updateCategory = function (body, categoryId) {
        return this.categoryService.updateCategory(body, categoryId);
    };
    CategoryController.prototype.getCategory = function (categoryId) {
        return this.categoryService.getCategory(categoryId);
    };
    CategoryController.prototype.deleteCategory = function (categoryId) {
        return this.categoryService.deleteCategory(categoryId);
    };
    CategoryController.prototype.getCategories = function () {
        return this.categoryService.getCategories();
    };
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
        (0, common_1.Post)(),
        (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
        __param(0, (0, common_1.Body)())
    ], CategoryController.prototype, "createCategory");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
        (0, common_1.Put)('/:categoryId'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Param)('categoryId', common_1.ParseUUIDPipe))
    ], CategoryController.prototype, "updateCategory");
    __decorate([
        (0, public_decorator_1.Public)(),
        (0, common_1.Get)('/:categoryId'),
        __param(0, (0, common_1.Param)('categoryId', common_1.ParseUUIDPipe))
    ], CategoryController.prototype, "getCategory");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
        (0, common_1.Delete)('/:categoryId'),
        __param(0, (0, common_1.Param)('categoryId', common_1.ParseUUIDPipe))
    ], CategoryController.prototype, "deleteCategory");
    __decorate([
        (0, public_decorator_1.Public)(),
        (0, common_1.Get)()
    ], CategoryController.prototype, "getCategories");
    CategoryController = __decorate([
        (0, common_1.Controller)('category')
    ], CategoryController);
    return CategoryController;
}());
exports.CategoryController = CategoryController;
