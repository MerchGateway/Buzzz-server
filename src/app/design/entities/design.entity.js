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
exports.Design = void 0;
var typeorm_1 = require("typeorm");
var product_entity_1 = require("../../../../../../../../../src/app/product/product.entity");
var user_entity_1 = require("../../../../../../../../../src/app/users/entities/user.entity");
var class_validator_1 = require("class-validator");
var Design = /** @class */ (function (_super) {
    __extends(Design, _super);
    function Design() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Design.prototype.async = function () {
        if (!this.contributors[0]) {
            this.owner && this.contributors.push(this.owner.email);
        }
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], Design.prototype, "id");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return product_entity_1.Product; }, function (product) { return product.design; }, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        })
    ], Design.prototype, "product");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.designs; }, {
            onDelete: 'CASCADE',
            eager: true
        }),
        (0, typeorm_1.JoinColumn)()
    ], Design.prototype, "owner");
    __decorate([
        (0, typeorm_1.Column)({ type: 'bool', "default": false })
    ], Design.prototype, "published");
    __decorate([
        (0, typeorm_1.Column)({ type: 'simple-json' })
    ], Design.prototype, "design_data");
    __decorate([
        (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
        (0, class_validator_1.IsOptional)()
    ], Design.prototype, "contributors");
    __decorate([
        (0, typeorm_1.Column)({
            type: 'simple-json',
            nullable: true
        })
    ], Design.prototype, "images");
    __decorate([
        (0, typeorm_1.Column)({ type: 'simple-array', nullable: true }),
        (0, class_validator_1.IsOptional)()
    ], Design.prototype, "texts");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Design.prototype, "created_at");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], Design.prototype, "updated_at");
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        (0, typeorm_1.BeforeUpdate)()
    ], Design.prototype, "async");
    Design = __decorate([
        (0, typeorm_1.Entity)('design')
    ], Design);
    return Design;
}(typeorm_1.BaseEntity));
exports.Design = Design;
