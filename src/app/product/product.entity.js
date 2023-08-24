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
exports.Product = void 0;
var typeorm_1 = require("typeorm");
var category_entity_1 = require("../category/entities/category.entity");
// import { Order } from '../order/entities/order.entity';
var payment_entity_1 = require("../payment/entities/payment.entity");
var user_entity_1 = require("../users/entities/user.entity");
var design_entity_1 = require("../design/entities/design.entity");
var Product = /** @class */ (function (_super) {
    __extends(Product, _super);
    function Product() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], Product.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ unique: false })
    ], Product.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', nullable: true, "default": 'noimage.png' })
    ], Product.prototype, "thumbnail");
    __decorate([
        (0, typeorm_1.Column)({ "default": false })
    ], Product.prototype, "inStock");
    __decorate([
        (0, typeorm_1.Column)({ type: 'numeric' })
    ], Product.prototype, "price");
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', nullable: true })
    ], Product.prototype, "description");
    __decorate([
        (0, typeorm_1.Column)({ "default": false })
    ], Product.prototype, "isPublished");
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        (0, typeorm_1.PrimaryColumn)()
    ], Product.prototype, "categoryId");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return category_entity_1.Category; }, function (category) { return category.products; }, { eager: true }),
        (0, typeorm_1.JoinColumn)()
    ], Product.prototype, "category");
    __decorate([
        (0, typeorm_1.Column)({ "default": null })
    ], Product.prototype, "receiptId");
    __decorate([
        (0, typeorm_1.Column)({ "default": false })
    ], Product.prototype, "purchased");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], Product.prototype, "bio");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return payment_entity_1.PaymentReceipt; }, function (paymentReceipt) { return paymentReceipt.product; }),
        (0, typeorm_1.JoinColumn)()
    ], Product.prototype, "receipt");
    __decorate([
        (0, typeorm_1.Column)({ "default": null })
    ], Product.prototype, "sellerId");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.products; }, { eager: true }),
        (0, typeorm_1.JoinColumn)()
    ], Product.prototype, "seller");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return design_entity_1.Design; }, function (design) { return design.product; }, {
            eager: true,
            onDelete: 'CASCADE'
        }),
        (0, typeorm_1.JoinColumn)()
    ], Product.prototype, "design");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ name: 'created_at' })
    ], Product.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' })
    ], Product.prototype, "updatedAt");
    Product = __decorate([
        (0, typeorm_1.Entity)({ name: 'product', schema: 'public' })
    ], Product);
    return Product;
}(typeorm_1.BaseEntity));
exports.Product = Product;
