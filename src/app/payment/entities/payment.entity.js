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
exports.PaymentReceipt = void 0;
var product_entity_1 = require("../../../../../../../../../src/app/product/product.entity");
var typeorm_1 = require("typeorm");
var PaymentReceipt = /** @class */ (function (_super) {
    __extends(PaymentReceipt, _super);
    function PaymentReceipt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], PaymentReceipt.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], PaymentReceipt.prototype, "user_id");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return product_entity_1.Product; }, function (product) { return product.receipt; }),
        (0, typeorm_1.JoinColumn)()
    ], PaymentReceipt.prototype, "product");
    __decorate([
        (0, typeorm_1.Column)()
    ], PaymentReceipt.prototype, "currency");
    __decorate([
        (0, typeorm_1.Column)()
    ], PaymentReceipt.prototype, "reference");
    __decorate([
        (0, typeorm_1.Column)()
    ], PaymentReceipt.prototype, "broker");
    __decorate([
        (0, typeorm_1.Column)()
    ], PaymentReceipt.prototype, "payment_status");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], PaymentReceipt.prototype, "created_at");
    PaymentReceipt = __decorate([
        (0, typeorm_1.Entity)(),
        (0, typeorm_1.Unique)(['reference'])
    ], PaymentReceipt);
    return PaymentReceipt;
}(typeorm_1.BaseEntity));
exports.PaymentReceipt = PaymentReceipt;
// export enum PaymentStatus {
//   'FAILED',
//   'SUCCESS',
// }
// export enum Broker {
//   'Paystack',
//   'Flutterwave',
//   'Kuda',
// }
