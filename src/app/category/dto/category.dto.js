"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateCategoryDto = exports.CreateCategoryDto = void 0;
var class_validator_1 = require("class-validator");
var CreateCategoryDto = /** @class */ (function () {
    function CreateCategoryDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(3),
        (0, class_validator_1.MaxLength)(16)
    ], CreateCategoryDto.prototype, "name");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(5),
        (0, class_validator_1.MaxLength)(80)
    ], CreateCategoryDto.prototype, "description");
    return CreateCategoryDto;
}());
exports.CreateCategoryDto = CreateCategoryDto;
var UpdateCategoryDto = /** @class */ (function () {
    function UpdateCategoryDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(3),
        (0, class_validator_1.MaxLength)(16),
        (0, class_validator_1.IsOptional)()
    ], UpdateCategoryDto.prototype, "name");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(5),
        (0, class_validator_1.MaxLength)(80),
        (0, class_validator_1.IsOptional)()
    ], UpdateCategoryDto.prototype, "description");
    return UpdateCategoryDto;
}());
exports.UpdateCategoryDto = UpdateCategoryDto;
