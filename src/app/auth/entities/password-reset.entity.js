"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PasswordReset = void 0;
var bcrypt = require("bcrypt");
var user_entity_1 = require("../../../../../../../../../src/app/users/entities/user.entity");
var typeorm_1 = require("typeorm");
var PasswordReset = /** @class */ (function () {
    function PasswordReset() {
    }
    PasswordReset.prototype.generateToken = function () {
        var token = Math.floor(1000 + Math.random() * 9000).toString();
        this.token = bcrypt.hashSync(token, 12);
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], PasswordReset.prototype, "id");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }),
        (0, typeorm_1.JoinColumn)({ name: 'user_id' })
    ], PasswordReset.prototype, "user");
    __decorate([
        (0, typeorm_1.Column)()
    ], PasswordReset.prototype, "token");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ name: 'created_at' })
    ], PasswordReset.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' })
    ], PasswordReset.prototype, "updatedAt");
    __decorate([
        (0, typeorm_1.BeforeInsert)()
    ], PasswordReset.prototype, "generateToken");
    PasswordReset = __decorate([
        (0, typeorm_1.Entity)()
    ], PasswordReset);
    return PasswordReset;
}());
exports.PasswordReset = PasswordReset;
