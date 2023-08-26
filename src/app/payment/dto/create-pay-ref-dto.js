"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PaymentReceiptDto = exports.CreatePayRefDto = void 0;
var class_validator_1 = require("class-validator");
// import { Broker, PaymentStatus } from '../entities/payment.entity';
var CreatePayRefDto = /** @class */ (function () {
    function CreatePayRefDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsEmail)()
    ], CreatePayRefDto.prototype, "email");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], CreatePayRefDto.prototype, "amount");
    return CreatePayRefDto;
}());
exports.CreatePayRefDto = CreatePayRefDto;
var PaymentReceiptDto = /** @class */ (function () {
    function PaymentReceiptDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], PaymentReceiptDto.prototype, "user_id");
    __decorate([
        (0, class_validator_1.IsUUID)(),
        (0, class_validator_1.IsNotEmpty)()
    ], PaymentReceiptDto.prototype, "productId");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], PaymentReceiptDto.prototype, "reference");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], PaymentReceiptDto.prototype, "currency");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], PaymentReceiptDto.prototype, "broker");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], PaymentReceiptDto.prototype, "payment_status");
    return PaymentReceiptDto;
}());
exports.PaymentReceiptDto = PaymentReceiptDto;
