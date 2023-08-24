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
exports.OrderController = void 0;
var common_1 = require("@nestjs/common");
var constant_1 = require("../../constant");
var common_2 = require("@nestjs/common");
var common_3 = require("@nestjs/common");
var user_decorator_1 = require("../../decorators/user.decorator");
var roles_decorator_1 = require("../../decorators/roles.decorator");
var general_1 = require("../../types/general");
var roles_guard_1 = require("../auth/guards/roles.guard");
var OrderController = /** @class */ (function () {
    function OrderController(orderService) {
        this.orderService = orderService;
    }
    OrderController.prototype.createOrder = function (payload, user) {
        return this.orderService.createOrder(payload, user);
    };
    OrderController.prototype.completeOrder = function (orderId) {
        return this.orderService.completeOrder(orderId);
    };
    OrderController.prototype.deleteOrder = function (orderId, user) {
        return this.orderService.deleteOrder(orderId);
    };
    OrderController.prototype.getAllOrders = function (page, limit) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        limit = limit > 100 ? 100 : limit < 10 ? 10 : limit;
        return this.orderService.getAllOrders({
            page: page,
            limit: limit,
            route: "".concat(constant_1.BASE_URL, "/order/all")
        });
    };
    OrderController.prototype.getOrder = function (orderId, user) {
        return this.orderService.getOrder(orderId);
    };
    OrderController.prototype.getOrders = function (user, page, limit) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        limit = limit > 100 ? 100 : limit < 10 ? 10 : limit;
        return this.orderService.getOrders(user, {
            page: page,
            limit: limit,
            route: "".concat(constant_1.BASE_URL, "/order/")
        });
    };
    OrderController.prototype.getActiveOrders = function (page, limit, id) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        limit = limit > 100 ? 100 : limit < 10 ? 10 : limit;
        return this.orderService.getActiveOrders(id, {
            page: page,
            limit: limit,
            route: "".concat(constant_1.BASE_URL, "/:userId/active")
        });
    };
    __decorate([
        (0, common_1.Post)(''),
        (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, user_decorator_1.CurrentUser)())
    ], OrderController.prototype, "createOrder");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
        (0, common_1.Put)('/:orderId/complete'),
        __param(0, (0, common_1.Param)('orderId', common_1.ParseUUIDPipe))
    ], OrderController.prototype, "completeOrder");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
        (0, common_1.Delete)('/:orderId'),
        __param(0, (0, common_1.Param)('orderId', common_1.ParseUUIDPipe)),
        __param(1, (0, user_decorator_1.CurrentUser)())
    ], OrderController.prototype, "deleteOrder");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
        (0, common_1.Get)('/all'),
        __param(0, (0, common_1.Query)('page', new common_3.DefaultValuePipe(1), common_2.ParseIntPipe)),
        __param(1, (0, common_1.Query)('limit', new common_3.DefaultValuePipe(10), common_2.ParseIntPipe))
    ], OrderController.prototype, "getAllOrders");
    __decorate([
        (0, common_1.Get)('/:orderId'),
        __param(0, (0, common_1.Param)('orderId', common_1.ParseUUIDPipe)),
        __param(1, (0, user_decorator_1.CurrentUser)())
    ], OrderController.prototype, "getOrder");
    __decorate([
        (0, common_1.Get)(''),
        __param(0, (0, user_decorator_1.CurrentUser)()),
        __param(1, (0, common_1.Query)('page', new common_3.DefaultValuePipe(1), common_2.ParseIntPipe)),
        __param(2, (0, common_1.Query)('limit', new common_3.DefaultValuePipe(10), common_2.ParseIntPipe))
    ], OrderController.prototype, "getOrders");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
        (0, common_1.Get)('/:userId/active'),
        __param(0, (0, common_1.Query)('page', new common_3.DefaultValuePipe(1), common_2.ParseIntPipe)),
        __param(1, (0, common_1.Query)('limit', new common_3.DefaultValuePipe(10), common_2.ParseIntPipe)),
        __param(2, (0, common_1.Param)('userId', common_1.ParseUUIDPipe))
    ], OrderController.prototype, "getActiveOrders");
    OrderController = __decorate([
        (0, common_1.Controller)('order')
    ], OrderController);
    return OrderController;
}());
exports.OrderController = OrderController;
