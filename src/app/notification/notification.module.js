"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NotificationModule = void 0;
var common_1 = require("@nestjs/common");
var notification_service_1 = require("./notification.service");
var notification_controller_1 = require("./notification.controller");
var typeorm_1 = require("@nestjs/typeorm");
var notification_entity_1 = require("./entities/notification.entity");
var config_1 = require("@nestjs/config");
var firebase_push_notification_provider_1 = require("../../providers/firebase-push-notification.provider");
var constant_1 = require("../../constant");
var user_entity_1 = require("../users/entities/user.entity");
var NotificationModule = /** @class */ (function () {
    function NotificationModule() {
    }
    NotificationModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([notification_entity_1.Notification, user_entity_1.User])],
            providers: [
                notification_service_1.NotificationService,
                {
                    provide: constant_1.PUSH_NOTIFICATION,
                    useFactory: function (configService) {
                        return new firebase_push_notification_provider_1.PushNotification(configService);
                    },
                    inject: [config_1.ConfigService]
                },
            ],
            controllers: [notification_controller_1.NotificationController],
            exports: [notification_service_1.NotificationService]
        })
    ], NotificationModule);
    return NotificationModule;
}());
exports.NotificationModule = NotificationModule;
