"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdatePrintingAdminDto = exports.CreatePrintingAdminDto = exports.UpdatePrintingPartnerDto = exports.CreatePrintingPartnerDto = void 0;
var class_validator_1 = require("class-validator");
var status_1 = require("../../../../../../../../../../src/types/status");
var CreatePrintingPartnerDto = /** @class */ (function () {
    function CreatePrintingPartnerDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)()
    ], CreatePrintingPartnerDto.prototype, "name");
    __decorate([
        (0, class_validator_1.IsObject)()
    ], CreatePrintingPartnerDto.prototype, "partner_address");
    return CreatePrintingPartnerDto;
}());
exports.CreatePrintingPartnerDto = CreatePrintingPartnerDto;
var UpdatePrintingPartnerDto = /** @class */ (function () {
    function UpdatePrintingPartnerDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)()
    ], UpdatePrintingPartnerDto.prototype, "name");
    __decorate([
        (0, class_validator_1.IsEnum)(status_1.Status),
        (0, class_validator_1.IsOptional)()
    ], UpdatePrintingPartnerDto.prototype, "status");
    __decorate([
        (0, class_validator_1.IsObject)(),
        (0, class_validator_1.IsOptional)()
    ], UpdatePrintingPartnerDto.prototype, "partner_address");
    return UpdatePrintingPartnerDto;
}());
exports.UpdatePrintingPartnerDto = UpdatePrintingPartnerDto;
var CreatePrintingAdminDto = /** @class */ (function () {
    function CreatePrintingAdminDto() {
    }
    __decorate([
        (0, class_validator_1.IsEmail)()
    ], CreatePrintingAdminDto.prototype, "email");
    __decorate([
        (0, class_validator_1.IsString)()
    ], CreatePrintingAdminDto.prototype, "password");
    return CreatePrintingAdminDto;
}());
exports.CreatePrintingAdminDto = CreatePrintingAdminDto;
var UpdatePrintingAdminDto = /** @class */ (function () {
    function UpdatePrintingAdminDto() {
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsEmail)()
    ], UpdatePrintingAdminDto.prototype, "email");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], UpdatePrintingAdminDto.prototype, "name");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], UpdatePrintingAdminDto.prototype, "password");
    return UpdatePrintingAdminDto;
}());
exports.UpdatePrintingAdminDto = UpdatePrintingAdminDto;
