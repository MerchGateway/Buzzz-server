"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateUserDto = void 0;
var class_validator_1 = require("class-validator");
var UpdateUserDto = /** @class */ (function () {
    function UpdateUserDto() {
    }
    __decorate([
        (0, class_validator_1.IsEmail)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateUserDto.prototype, "email");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateUserDto.prototype, "name");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateUserDto.prototype, "username");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateUserDto.prototype, "bio");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateUserDto.prototype, "phoneNumber");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateUserDto.prototype, "address");
    __decorate([
        (0, class_validator_1.IsObject)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateUserDto.prototype, "shipping_address");
    __decorate([
        (0, class_validator_1.IsBoolean)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateUserDto.prototype, "isPublic");
    __decorate([
        (0, class_validator_1.IsBoolean)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateUserDto.prototype, "showEmail");
    __decorate([
        (0, class_validator_1.IsUrl)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateUserDto.prototype, "instagram");
    __decorate([
        (0, class_validator_1.IsUrl)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateUserDto.prototype, "facebook");
    __decorate([
        (0, class_validator_1.IsUrl)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateUserDto.prototype, "twitter");
    __decorate([
        (0, class_validator_1.IsUrl)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateUserDto.prototype, "reddit");
    __decorate([
        (0, class_validator_1.IsBoolean)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateUserDto.prototype, "allowNotification");
    __decorate([
        (0, class_validator_1.IsObject)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateUserDto.prototype, "twoFactorAuthentication");
    return UpdateUserDto;
}());
exports.UpdateUserDto = UpdateUserDto;
