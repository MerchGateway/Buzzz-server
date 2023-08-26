"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateLogisticsAdminDto = exports.CreateLogisticsAdminDto = exports.UpdateLogisticsPartnerDto = exports.CreateLogisticsPartnerDto = void 0;
var class_validator_1 = require("class-validator");
var status_1 = require("../../../../types/status");
var CreateLogisticsPartnerDto = /** @class */ (function () {
    function CreateLogisticsPartnerDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)()
    ], CreateLogisticsPartnerDto.prototype, "name");
    __decorate([
        (0, class_validator_1.IsObject)()
    ], CreateLogisticsPartnerDto.prototype, "partner_address");
    return CreateLogisticsPartnerDto;
}());
exports.CreateLogisticsPartnerDto = CreateLogisticsPartnerDto;
var UpdateLogisticsPartnerDto = /** @class */ (function () {
    function UpdateLogisticsPartnerDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateLogisticsPartnerDto.prototype, "name");
    __decorate([
        (0, class_validator_1.IsEnum)(status_1.Status),
        (0, class_validator_1.IsOptional)()
    ], UpdateLogisticsPartnerDto.prototype, "status");
    __decorate([
        (0, class_validator_1.IsObject)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateLogisticsPartnerDto.prototype, "partner_address");
    return UpdateLogisticsPartnerDto;
}());
exports.UpdateLogisticsPartnerDto = UpdateLogisticsPartnerDto;
var CreateLogisticsAdminDto = /** @class */ (function () {
    function CreateLogisticsAdminDto() {
    }
    __decorate([
        (0, class_validator_1.IsEmail)()
    ], CreateLogisticsAdminDto.prototype, "email");
    __decorate([
        (0, class_validator_1.IsString)()
    ], CreateLogisticsAdminDto.prototype, "password");
    return CreateLogisticsAdminDto;
}());
exports.CreateLogisticsAdminDto = CreateLogisticsAdminDto;
var UpdateLogisticsAdminDto = /** @class */ (function () {
    function UpdateLogisticsAdminDto() {
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsEmail)()
    ], UpdateLogisticsAdminDto.prototype, "email");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], UpdateLogisticsAdminDto.prototype, "name");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], UpdateLogisticsAdminDto.prototype, "password");
    return UpdateLogisticsAdminDto;
}());
exports.UpdateLogisticsAdminDto = UpdateLogisticsAdminDto;
