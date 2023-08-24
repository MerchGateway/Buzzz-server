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
exports.Category = void 0;
var product_entity_1 = require("../../../../../../../../../src/app/product/product.entity");
var typeorm_1 = require("typeorm");
var Category = /** @class */ (function (_super) {
    __extends(Category, _super);
    function Category() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], Category.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({
            type: 'varchar',
            unique: true,
            transformer: { to: function (value) { return value.trim(); }, from: function (value) { return value; } }
        })
    ], Category.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)({
            type: 'varchar',
            transformer: { to: function (value) { return value.trim(); }, from: function (value) { return value; } }
        })
    ], Category.prototype, "description");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return product_entity_1.Product; }, function (products) { return products.category; })
    ], Category.prototype, "products");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Category.prototype, "created_at");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], Category.prototype, "updated_at");
    Category = __decorate([
        (0, typeorm_1.Entity)('category')
    ], Category);
    return Category;
}(typeorm_1.BaseEntity));
exports.Category = Category;
