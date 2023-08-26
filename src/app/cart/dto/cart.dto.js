"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateCartDto = exports.CreateCartDto = void 0;
var class_validator_1 = require("class-validator");
var color_1 = require("../../../types/color");
var size_1 = require("../../../types/size");
var CreateCartDto = /** @class */ (function () {
    function CreateCartDto() {
    }
    __decorate([
        (0, class_validator_1.IsUUID)()
    ], CreateCartDto.prototype, "product");
    __decorate([
        (0, class_validator_1.IsNumber)()
    ], CreateCartDto.prototype, "quantity");
    __decorate([
        (0, class_validator_1.IsEnum)(size_1.Size),
        (0, class_validator_1.IsOptional)()
    ], CreateCartDto.prototype, "size");
    __decorate([
        (0, class_validator_1.IsEnum)(color_1.Color),
        (0, class_validator_1.IsOptional)()
    ], CreateCartDto.prototype, "color");
    return CreateCartDto;
}());
exports.CreateCartDto = CreateCartDto;
var UpdateCartDto = /** @class */ (function () {
    function UpdateCartDto() {
    }
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateCartDto.prototype, "quantity");
    __decorate([
        (0, class_validator_1.IsEnum)(size_1.Size),
        (0, class_validator_1.IsOptional)()
    ], UpdateCartDto.prototype, "size");
    __decorate([
        (0, class_validator_1.IsEnum)(color_1.Color),
        (0, class_validator_1.IsOptional)()
    ], UpdateCartDto.prototype, "color");
    return UpdateCartDto;
}());
exports.UpdateCartDto = UpdateCartDto;
