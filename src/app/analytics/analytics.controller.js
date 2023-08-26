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
exports.AnalyticsController = void 0;
var common_1 = require("@nestjs/common");
var user_decorator_1 = require("../../decorators/user.decorator");
var AnalyticsController = /** @class */ (function () {
    function AnalyticsController(analyticsService) {
        this.analyticsService = analyticsService;
    }
    AnalyticsController.prototype.orders = function (user) {
        return this.analyticsService.orders(user);
    };
    AnalyticsController.prototype.revenue = function (user) {
        return this.analyticsService.revenue(user);
    };
    AnalyticsController.prototype.customer = function (user) {
        return this.analyticsService.customer(user);
    };
    __decorate([
        (0, common_1.Get)('orders'),
        __param(0, (0, user_decorator_1.CurrentUser)())
    ], AnalyticsController.prototype, "orders");
    __decorate([
        (0, common_1.Get)('revenue'),
        __param(0, (0, user_decorator_1.CurrentUser)())
    ], AnalyticsController.prototype, "revenue");
    __decorate([
        (0, common_1.Get)('customer'),
        __param(0, (0, user_decorator_1.CurrentUser)())
    ], AnalyticsController.prototype, "customer");
    AnalyticsController = __decorate([
        (0, common_1.Controller)('analytics')
    ], AnalyticsController);
    return AnalyticsController;
}());
exports.AnalyticsController = AnalyticsController;
