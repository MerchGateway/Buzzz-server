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
exports.PrintingPartnerController = void 0;
var common_1 = require("@nestjs/common");
var general_1 = require("../../../../../../../../../src/types/general");
var roles_decorator_1 = require("../../../../../../../../../src/decorators/roles.decorator");
var user_decorator_1 = require("../../../decorators/user.decorator");
var PrintingPartnerController = /** @class */ (function () {
    function PrintingPartnerController(printingService) {
        this.printingService = printingService;
    }
    PrintingPartnerController.prototype.getOrders = function (user) {
        return this.printingService.getOrders(user);
    };
    PrintingPartnerController.prototype.viewPackagingContent = function (user, id) {
        return this.printingService.viewPackagingContent(user, id);
    };
    PrintingPartnerController.prototype.viewDesign = function (user, id) {
        return this.printingService.viewDesign(user, id);
    };
    PrintingPartnerController.prototype.updateStatus = function (body, user, id) {
        return this.printingService.updateStatus(user, body, id);
    };
    PrintingPartnerController.prototype.downloadDesign = function (user, id) {
        return this.printingService.downloadDesign(user, id);
    };
    PrintingPartnerController.prototype.viewOrder = function (user, id) {
        return this.printingService.viewOrder(user, id);
    };
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.PRINTING_ADMIN),
        (0, common_1.Get)('/get-orders'),
        __param(0, (0, user_decorator_1.CurrentUser)())
    ], PrintingPartnerController.prototype, "getOrders");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.PRINTING_ADMIN),
        (0, common_1.Get)('/view-packaging-content/:id'),
        __param(0, (0, user_decorator_1.CurrentUser)()),
        __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe))
    ], PrintingPartnerController.prototype, "viewPackagingContent");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.PRINTING_ADMIN),
        (0, common_1.Get)('/view-design/:id'),
        __param(0, (0, user_decorator_1.CurrentUser)()),
        __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe))
    ], PrintingPartnerController.prototype, "viewDesign");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.PRINTING_ADMIN),
        (0, common_1.Patch)('/update-status/:id'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, user_decorator_1.CurrentUser)()),
        __param(2, (0, common_1.Param)('id', common_1.ParseUUIDPipe))
    ], PrintingPartnerController.prototype, "updateStatus");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.PRINTING_ADMIN),
        (0, common_1.Get)('/download-design/:id'),
        __param(0, (0, user_decorator_1.CurrentUser)()),
        __param(1, (0, common_1.Param)('id'))
    ], PrintingPartnerController.prototype, "downloadDesign");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.PRINTING_ADMIN),
        (0, common_1.Get)('/view-order/:id'),
        __param(0, (0, user_decorator_1.CurrentUser)()),
        __param(1, (0, common_1.Param)('id'))
    ], PrintingPartnerController.prototype, "viewOrder");
    PrintingPartnerController = __decorate([
        (0, common_1.Controller)('admin/printing-partner')
    ], PrintingPartnerController);
    return PrintingPartnerController;
}());
exports.PrintingPartnerController = PrintingPartnerController;
