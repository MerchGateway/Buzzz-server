"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Notification = void 0;
var typeorm_1 = require("typeorm");
var notification_1 = require("../../../types/notification");
var user_entity_1 = require("../../users/entities/user.entity");
var Notification = /** @class */ (function (_super) {
    __extends(Notification, _super);
    function Notification() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], Notification.prototype, "id");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, {
            onDelete: 'CASCADE'
        }),
        (0, typeorm_1.JoinColumn)({ name: 'client_id' })
    ], Notification.prototype, "user");
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar' })
    ], Notification.prototype, "title");
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar' })
    ], Notification.prototype, "message");
    __decorate([
        (0, typeorm_1.Column)({ type: 'enum', "enum": notification_1.Status, "default": notification_1.Status.UNREAD })
    ], Notification.prototype, "status");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Notification.prototype, "created_at");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], Notification.prototype, "updated_at");
    Notification = __decorate([
        (0, typeorm_1.Entity)('notification')
    ], Notification);
    return Notification;
}(typeorm_1.BaseEntity));
exports.Notification = Notification;
