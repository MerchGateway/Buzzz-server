"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditProductDto = exports.CreateProductDto = void 0;
var class_validator_1 = require("class-validator");
var CreateProductDto = /** @class */ (function () {
    function CreateProductDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateProductDto.prototype, "name");
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateProductDto.prototype, "price");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)()
    ], CreateProductDto.prototype, "description");
    __decorate([
        (0, class_validator_1.IsUUID)(),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateProductDto.prototype, "categoryId");
    return CreateProductDto;
}());
exports.CreateProductDto = CreateProductDto;
var EditProductDto = /** @class */ (function () {
    function EditProductDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)()
    ], EditProductDto.prototype, "name");
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsOptional)()
    ], EditProductDto.prototype, "price");
    __decorate([
        (0, class_validator_1.IsUUID)(),
        (0, class_validator_1.IsOptional)()
    ], EditProductDto.prototype, "categoryId");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.MaxLength)(40),
        (0, class_validator_1.MinLength)(10)
    ], EditProductDto.prototype, "bio");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)()
    ], EditProductDto.prototype, "description");
    return EditProductDto;
}());
exports.EditProductDto = EditProductDto;
