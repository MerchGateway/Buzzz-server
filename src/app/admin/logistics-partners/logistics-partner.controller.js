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
exports.LogisticsPartnerController = void 0;
var common_1 = require("@nestjs/common");
var general_1 = require("../../../types/general");
var roles_decorator_1 = require("../../../decorators/roles.decorator");
var user_decorator_1 = require("../../../decorators/user.decorator");
var LogisticsPartnerController = /** @class */ (function () {
    function LogisticsPartnerController(logisticsService) {
        this.logisticsService = logisticsService;
    }
    LogisticsPartnerController.prototype.getOrders = function (user) {
        return this.logisticsService.getOrders(user);
    };
    LogisticsPartnerController.prototype.updateStatus = function (body, user, id) {
        return this.logisticsService.updateStatus(user, body, id);
    };
    LogisticsPartnerController.prototype.viewOrder = function (user, id) {
        return this.logisticsService.viewOrder(user, id);
    };
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.LOGISTIC_ADMIN),
        (0, common_1.Get)('/get-orders'),
        __param(0, (0, user_decorator_1.CurrentUser)())
    ], LogisticsPartnerController.prototype, "getOrders");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.LOGISTIC_ADMIN),
        (0, common_1.Patch)('/update-status/:id'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, user_decorator_1.CurrentUser)()),
        __param(2, (0, common_1.Param)('id'))
    ], LogisticsPartnerController.prototype, "updateStatus");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.LOGISTIC_ADMIN),
        (0, common_1.Get)('/view-order/:id'),
        __param(0, (0, user_decorator_1.CurrentUser)()),
        __param(1, (0, common_1.Param)('id'))
    ], LogisticsPartnerController.prototype, "viewOrder");
    LogisticsPartnerController = __decorate([
        (0, common_1.Controller)('admin/logistics-partner')
    ], LogisticsPartnerController);
    return LogisticsPartnerController;
}());
exports.LogisticsPartnerController = LogisticsPartnerController;
