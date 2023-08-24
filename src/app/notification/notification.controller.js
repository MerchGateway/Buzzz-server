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
exports.NotificationController = void 0;
var common_1 = require("@nestjs/common");
var roles_decorator_1 = require("../../../../../../../../src/decorators/roles.decorator");
var general_1 = require("../../../../../../../../src/types/general");
var user_decorator_1 = require("../../decorators/user.decorator");
var notification_dto_1 = require("./entities/dto/notification.dto");
notification_dto_1.CreateNotificationDto;
var NotificationController = /** @class */ (function () {
    function NotificationController(notificationService) {
        this.notificationService = notificationService;
    }
    NotificationController.prototype.fetchNotification = function (user) {
        return this.notificationService.fetchNotification(user);
    };
    NotificationController.prototype.turnOnNotification = function (payload, user) {
        return this.notificationService.turnOnNotification(user, payload);
    };
    NotificationController.prototype.refreshRegisterationToken = function (payload, user) {
        return this.notificationService.refreshRegisterationToken(user, payload);
    };
    NotificationController.prototype.createNotification = function (payload) {
        return this.notificationService.createNotification(payload);
    };
    NotificationController.prototype.createMultipleNotification = function (query, payload) {
        return this.notificationService.createMultipleNotifications(payload, query);
    };
    NotificationController.prototype.readNotification = function (user, id) {
        return this.notificationService.markNotificationAsRead(id, user);
    };
    __decorate([
        (0, common_1.Get)('fetch-notification'),
        (0, common_1.HttpCode)(common_1.HttpStatus.FOUND),
        __param(0, (0, user_decorator_1.CurrentUser)())
    ], NotificationController.prototype, "fetchNotification");
    __decorate([
        (0, common_1.Patch)('turn-on'),
        (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, user_decorator_1.CurrentUser)())
    ], NotificationController.prototype, "turnOnNotification");
    __decorate([
        (0, common_1.Patch)('refresh-registeration-token'),
        (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, user_decorator_1.CurrentUser)())
    ], NotificationController.prototype, "refreshRegisterationToken");
    __decorate([
        (0, common_1.Post)('create-notification'),
        (0, roles_decorator_1.Roles)(general_1.Role.ADMIN, general_1.Role.SUPER_ADMIN, general_1.Role.PUBLISHER, general_1.Role.USER),
        (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
        __param(0, (0, common_1.Body)())
    ], NotificationController.prototype, "createNotification");
    __decorate([
        (0, common_1.Post)('create-multiple-notifications'),
        (0, roles_decorator_1.Roles)(general_1.Role.ADMIN, general_1.Role.SUPER_ADMIN, general_1.Role.PUBLISHER),
        (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
        __param(0, (0, common_1.Query)()),
        __param(1, (0, common_1.Body)())
    ], NotificationController.prototype, "createMultipleNotification");
    __decorate([
        (0, common_1.Patch)('read'),
        __param(0, (0, user_decorator_1.CurrentUser)()),
        __param(1, (0, common_1.Param)('id'))
    ], NotificationController.prototype, "readNotification");
    NotificationController = __decorate([
        (0, common_1.Controller)('notification')
    ], NotificationController);
    return NotificationController;
}());
exports.NotificationController = NotificationController;
