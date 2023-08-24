"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.AdminController = void 0;
var common_1 = require("@nestjs/common");
var general_1 = require("../../../../../../../../src/types/general");
var roles_decorator_1 = require("../../../../../../../../src/decorators/roles.decorator");
var common_2 = require("@nestjs/common");
var AdminController = /** @class */ (function () {
    function AdminController(adminService) {
        this.adminService = adminService;
    }
    AdminController.prototype.createPrintingPartner = function (data) {
        return this.adminService.createPrintingPartner(data);
    };
    AdminController.prototype.createLogisticsPartner = function (data) {
        return this.adminService.createLogisticPartner(data);
    };
    AdminController.prototype.editPrintingPartner = function (data, id) {
        return this.adminService.editPrintingPartner(data, id);
    };
    AdminController.prototype.editLogisticsPartner = function (data, id) {
        return this.adminService.editLogisticsPartner(data, id);
    };
    AdminController.prototype.getPrintingPartners = function () {
        return this.adminService.getAllPrintingPartners();
    };
    AdminController.prototype.getAllLogisticsPartners = function () {
        return this.adminService.getAllLogisticsPartners();
    };
    AdminController.prototype.getSingleLogisticsPartner = function (id) {
        return this.adminService.getSingleLogisticsPartner(id);
    };
    AdminController.prototype.getSinglePrintingPartner = function (id) {
        return this.adminService.getSinglePrintingPartner(id);
    };
    // @Roles(Role.SUPER_ADMIN)
    // @Patch('toggle-printing-partner-status/:id')
    // togglePrintingPartnerStatus(
    //   @Param('id', ParseUUIDPipe) id: string,
    //   @Body() data: UpdateLogisticsPartnerDto,
    // ) {
    //   return this.adminService.togglePrintingPartnerStatus(id, data);
    // }
    // @Roles(Role.SUPER_ADMIN)
    // @Patch('toggle-logistics-partner-status/:id')
    // toggleLogisticsPartnerStatus(
    //   @Param('id', ParseUUIDPipe) id: string,
    //   @Body() data: UpdateLogisticsPartnerDto,
    // ) {
    //   return this.adminService.toggleLogisticsPartnerStatus(id, data);
    // }
    AdminController.prototype.editLogisticsAdmin = function (id, data) {
        return this.adminService.editLogisticsAdmin(data, id);
    };
    AdminController.prototype.editPrintingAdmin = function (id, data) {
        return this.adminService.editPrintingAdmin(data, id);
    };
    AdminController.prototype.removePrintingPartner = function (id) {
        return this.adminService.deletePrintingPartner(id);
    };
    AdminController.prototype.removeLogisticsPartner = function (id) {
        return this.adminService.deleteLogisticsPartner(id);
    };
    AdminController.prototype.createLogisticsAdmin = function (id, data) {
        return this.adminService.createLogisticsAdmin(data, id);
    };
    AdminController.prototype.createPrintingAdmin = function (id, data) {
        return this.adminService.createPrintingAdmin(data, id);
    };
    AdminController.prototype.getPrintingAdmins = function () {
        return this.adminService.viewAllPrintingAdmins();
    };
    AdminController.prototype.getLogisticsAdmins = function () {
        return this.adminService.viewAllLogisticsAdmins();
    };
    AdminController.prototype.viewAllOrdersAssignedToPrintingPartner = function (id) {
        return this.adminService.viewAllOrdersAssignedToPrintingPartner(id);
    };
    AdminController.prototype.viewAllOrdersAssignedToLogisticsPartner = function (id) {
        return this.adminService.viewAllOrdersAssignedToLogisticsPartner(id);
    };
    AdminController.prototype.assignOrdersToLogisticsPartner = function (id, data) {
        return this.adminService.AssignOrdersToLogisticsPartner(__assign(__assign({}, data), { logisticsPartner: id }));
    };
    AdminController.prototype.assignOrdersPrintingPartner = function (id, data) {
        return this.adminService.AssignOrdersToPrintingPartner(__assign(__assign({}, data), { printingPartner: id }));
    };
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.Post)('create-printing-partner'),
        __param(0, (0, common_1.Body)())
    ], AdminController.prototype, "createPrintingPartner");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.Post)('create-logistics-partner'),
        __param(0, (0, common_1.Body)())
    ], AdminController.prototype, "createLogisticsPartner");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.Patch)('edit-printing-partner/:id'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Param)('id', common_2.ParseUUIDPipe))
    ], AdminController.prototype, "editPrintingPartner");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.Patch)('edit-logistics-partner/:id'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Param)('id', common_2.ParseUUIDPipe))
    ], AdminController.prototype, "editLogisticsPartner");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.Get)('get-all-printing-partners')
    ], AdminController.prototype, "getPrintingPartners");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.Get)('get-all-logistics-partners')
    ], AdminController.prototype, "getAllLogisticsPartners");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.Get)('get-logistics-partner/:id'),
        __param(0, (0, common_1.Param)('id', common_2.ParseUUIDPipe))
    ], AdminController.prototype, "getSingleLogisticsPartner");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.Get)('get-printing-partner/:id'),
        __param(0, (0, common_1.Param)('id', common_2.ParseUUIDPipe))
    ], AdminController.prototype, "getSinglePrintingPartner");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.Put)('edit-logistics-admin/:id'),
        __param(0, (0, common_1.Param)('id', common_2.ParseUUIDPipe))
    ], AdminController.prototype, "editLogisticsAdmin");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.Put)('edit-printing-admin/:id'),
        __param(0, (0, common_1.Param)('id', common_2.ParseUUIDPipe))
    ], AdminController.prototype, "editPrintingAdmin");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.Delete)('delete-printing-partner/:id'),
        __param(0, (0, common_1.Param)('id', common_2.ParseUUIDPipe))
    ], AdminController.prototype, "removePrintingPartner");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.Delete)('delete-logistics-partner/:id'),
        __param(0, (0, common_1.Param)('id', common_2.ParseUUIDPipe))
    ], AdminController.prototype, "removeLogisticsPartner");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.Post)('create-logistics-admin/:id'),
        __param(0, (0, common_1.Param)('id', common_2.ParseUUIDPipe)),
        __param(1, (0, common_1.Body)())
    ], AdminController.prototype, "createLogisticsAdmin");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.Post)('create-printing-admin/:id'),
        __param(0, (0, common_1.Param)('id', common_2.ParseUUIDPipe)),
        __param(1, (0, common_1.Body)())
    ], AdminController.prototype, "createPrintingAdmin");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.Get)('get-printing-admins')
    ], AdminController.prototype, "getPrintingAdmins");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.Get)('get-logistics-admins')
    ], AdminController.prototype, "getLogisticsAdmins");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.Get)('order-assigned-to-printing-partner/:id'),
        __param(0, (0, common_1.Param)('id', common_2.ParseUUIDPipe))
    ], AdminController.prototype, "viewAllOrdersAssignedToPrintingPartner");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.Get)('order-assigned-to-logistics-partner/:id'),
        __param(0, (0, common_1.Param)('id', common_2.ParseUUIDPipe))
    ], AdminController.prototype, "viewAllOrdersAssignedToLogisticsPartner");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.Put)('assign-orders-to-logistics-partner/:id'),
        __param(0, (0, common_1.Param)('id', common_2.ParseUUIDPipe)),
        __param(1, (0, common_1.Body)())
    ], AdminController.prototype, "assignOrdersToLogisticsPartner");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.Put)('assign-orders-to-printing-partner/:id'),
        __param(0, (0, common_1.Param)('id', common_2.ParseUUIDPipe)),
        __param(1, (0, common_1.Body)())
    ], AdminController.prototype, "assignOrdersPrintingPartner");
    AdminController = __decorate([
        (0, common_1.Controller)('admin')
    ], AdminController);
    return AdminController;
}());
exports.AdminController = AdminController;
