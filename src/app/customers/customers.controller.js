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
exports.CustomersController = void 0;
var common_1 = require("@nestjs/common");
var user_decorator_1 = require("../../decorators/user.decorator");
var roles_decorator_1 = require("../../decorators/roles.decorator");
var general_1 = require("../../types/general");
var roles_guard_1 = require("../auth/guards/roles.guard");
var common_2 = require("@nestjs/common");
// import { CustomerParams } from '../../../dist/app/customers/customers.service';
var CustomersController = /** @class */ (function () {
    function CustomersController(customersService) {
        this.customersService = customersService;
    }
    // receives the customers Id(current user id) and also the product owners id
    // finds if the current user has been linked to the product owner,
    // if not, create a relationship
    CustomersController.prototype.create = function (sellerId, user) {
        return this.customersService.create(sellerId, user);
    };
    // gets all the customers
    CustomersController.prototype.findAllCustomersAvailable = function () {
        return this.customersService.findAllCustomersAvailable();
    };
    // gets all the customers for the current user,
    CustomersController.prototype.findAll = function (user) {
        return this.customersService.findAll(user.id);
    };
    CustomersController.prototype.toggleStatus = function (Status, sellerId) {
        return this.customersService.toggleStatus(Status, sellerId);
    };
    CustomersController.prototype.deleteCustomer = function (sellerId) {
        return this.customersService.deleteCustomer(sellerId);
    };
    __decorate([
        (0, common_1.Post)(':sellerId'),
        __param(0, (0, common_1.Param)('sellerId', common_1.ParseUUIDPipe)),
        __param(1, (0, user_decorator_1.CurrentUser)())
    ], CustomersController.prototype, "create");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_2.UseGuards)(roles_guard_1.RolesGuard),
        (0, common_1.Get)('all')
    ], CustomersController.prototype, "findAllCustomersAvailable");
    __decorate([
        (0, common_1.Get)(),
        __param(0, (0, user_decorator_1.CurrentUser)())
    ], CustomersController.prototype, "findAll");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_2.UseGuards)(roles_guard_1.RolesGuard),
        (0, common_1.Patch)('/toggle-status/:sellerId'),
        __param(0, (0, common_1.Body)('customer-status')),
        __param(1, (0, common_1.Param)('sellerId', common_1.ParseUUIDPipe))
    ], CustomersController.prototype, "toggleStatus");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_2.UseGuards)(roles_guard_1.RolesGuard),
        (0, common_1.Delete)('/:sellerId'),
        __param(0, (0, common_1.Param)('sellerId', common_1.ParseUUIDPipe))
    ], CustomersController.prototype, "deleteCustomer");
    CustomersController = __decorate([
        (0, common_1.Controller)('customers')
    ], CustomersController);
    return CustomersController;
}());
exports.CustomersController = CustomersController;
