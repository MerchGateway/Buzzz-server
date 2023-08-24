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
exports.DesignController = void 0;
var common_1 = require("@nestjs/common");
var common_2 = require("@nestjs/common");
var general_1 = require("../../../../../../../../src/types/general");
var roles_guard_1 = require("../auth/guards/roles.guard");
var roles_decorator_1 = require("../../../../../../../../src/decorators/roles.decorator");
var user_decorator_1 = require("../../../../../../../../src/decorators/user.decorator");
var public_decorator_1 = require("../../../../../../../../src/decorators/public.decorator");
var DesignController = /** @class */ (function () {
    function DesignController(designService) {
        this.designService = designService;
    }
    DesignController.prototype.fetchPolyMailerContents = function () {
        return this.designService.fetchPolymailerContents();
    };
    DesignController.prototype.createPolyMailerContent = function (payload) {
        return this.designService.createPolymailerContent(payload);
    };
    DesignController.prototype.viewAllDesigns = function (user) {
        return this.designService.viewAllDesigns(user);
    };
    DesignController.prototype.fetchLatestDesignForUser = function (user) {
        return this.designService.fetchLatestDesignForCurrentUser(user);
    };
    DesignController.prototype.fetchSingleDesign = function (id) {
        return this.designService.fetchSingleDesign(id);
    };
    DesignController.prototype.deleteSingleDesign = function (id) {
        return this.designService.deleteSingleDesign(id);
    };
    DesignController.prototype.deleteDesign = function (user, id) {
        return this.designService.deleteDesignForCurrentUser(user, id);
    };
    DesignController.prototype.addContributors = function (user, id, payload) {
        return this.designService.addContributorsToDesign({ emails: payload.emails, id: id }, user);
    };
    DesignController.prototype.removeContributors = function (user, id, payload) {
        return this.designService.removeContributorsToDesign({ emails: payload.emails, id: id }, user);
    };
    DesignController.prototype.publishDesign = function (payload, user, id, category_id) {
        return this.designService.publishDesign(user, payload, id, category_id);
    };
    DesignController.prototype.fetchMyDesign = function (user, id) {
        return this.designService.fetchMyDesign(id, user);
    };
    DesignController.prototype.publishDesignAndCheckout = function (payload, user, id, category_id) {
        return this.designService.publishDesignAndCheckout(user, payload, id, category_id);
    };
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN, general_1.Role.PRINTING_ADMIN),
        (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
        (0, common_1.Get)('polymailer-contents')
    ], DesignController.prototype, "fetchPolyMailerContents");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN, general_1.Role.PRINTING_ADMIN),
        (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
        (0, common_1.Post)('create-polymailer-content'),
        __param(0, (0, common_1.Body)())
    ], DesignController.prototype, "createPolyMailerContent");
    __decorate([
        (0, common_1.Get)('all'),
        __param(0, (0, user_decorator_1.CurrentUser)())
    ], DesignController.prototype, "viewAllDesigns");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.USER),
        (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
        (0, common_1.Get)(''),
        __param(0, (0, user_decorator_1.CurrentUser)())
    ], DesignController.prototype, "fetchLatestDesignForUser");
    __decorate([
        (0, public_decorator_1.Public)(),
        (0, common_1.Get)('view-design/:id'),
        __param(0, (0, common_1.Param)('id', common_2.ParseUUIDPipe))
    ], DesignController.prototype, "fetchSingleDesign");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
        (0, common_1.Delete)('single-design/:id'),
        __param(0, (0, common_1.Param)('id', common_2.ParseUUIDPipe))
    ], DesignController.prototype, "deleteSingleDesign");
    __decorate([
        (0, common_1.Delete)(':id'),
        __param(0, (0, user_decorator_1.CurrentUser)()),
        __param(1, (0, common_1.Param)('id', common_2.ParseUUIDPipe))
    ], DesignController.prototype, "deleteDesign");
    __decorate([
        (0, common_1.Put)('add-contributors/:id'),
        __param(0, (0, user_decorator_1.CurrentUser)()),
        __param(1, (0, common_1.Param)('id', common_2.ParseUUIDPipe)),
        __param(2, (0, common_1.Body)())
    ], DesignController.prototype, "addContributors");
    __decorate([
        (0, common_1.Put)('remove-contributors/:id'),
        __param(0, (0, user_decorator_1.CurrentUser)()),
        __param(1, (0, common_1.Param)('id', common_2.ParseUUIDPipe)),
        __param(2, (0, common_1.Body)())
    ], DesignController.prototype, "removeContributors");
    __decorate([
        (0, common_1.Post)('publish-design/:id'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, user_decorator_1.CurrentUser)()),
        __param(2, (0, common_1.Param)('id', common_2.ParseUUIDPipe)),
        __param(3, (0, common_1.Query)('category-id', common_2.ParseUUIDPipe))
    ], DesignController.prototype, "publishDesign");
    __decorate([
        (0, common_1.Get)('fetch-my-design/:id'),
        __param(0, (0, user_decorator_1.CurrentUser)()),
        __param(1, (0, common_1.Param)('id', common_2.ParseUUIDPipe))
    ], DesignController.prototype, "fetchMyDesign");
    __decorate([
        (0, common_1.Post)('publish-design-and-checkout/:id'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, user_decorator_1.CurrentUser)()),
        __param(2, (0, common_1.Param)('id', common_2.ParseUUIDPipe)),
        __param(3, (0, common_1.Query)('category-id', common_2.ParseUUIDPipe))
    ], DesignController.prototype, "publishDesignAndCheckout");
    DesignController = __decorate([
        (0, common_1.Controller)('design')
    ], DesignController);
    return DesignController;
}());
exports.DesignController = DesignController;
