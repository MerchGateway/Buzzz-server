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
exports.TwoFactorAuth = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../users/entities/user.entity");
var TwoFactorAuth = /** @class */ (function (_super) {
    __extends(TwoFactorAuth, _super);
    function TwoFactorAuth() {
        return _super.call(this) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], TwoFactorAuth.prototype, "id");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }),
        (0, typeorm_1.JoinColumn)({ name: 'user_id' })
    ], TwoFactorAuth.prototype, "user");
    __decorate([
        (0, typeorm_1.Column)({ name: '2fa_secret', type: 'varchar', select: false })
    ], TwoFactorAuth.prototype, "secret");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], TwoFactorAuth.prototype, "created_at");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], TwoFactorAuth.prototype, "updated_at");
    TwoFactorAuth = __decorate([
        (0, typeorm_1.Entity)('2fa')
    ], TwoFactorAuth);
    return TwoFactorAuth;
}(typeorm_1.BaseEntity));
exports.TwoFactorAuth = TwoFactorAuth;
