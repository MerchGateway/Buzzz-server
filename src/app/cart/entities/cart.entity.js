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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Cart = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../users/entities/user.entity");
var order_entity_1 = require("../../order/entities/order.entity");
var product_entity_1 = require("../../product/product.entity");
var size_1 = require("../../../../../../../../../src/types/size");
var color_1 = require("../../../../../../../../../src/types/color");
var Cart = /** @class */ (function (_super) {
    __extends(Cart, _super);
    function Cart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cart.prototype.calculateTotal = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.total = this.product.price * Math.abs(this.quantity);
                return [2 /*return*/];
            });
        });
    };
    Cart.prototype.addColor = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                !this.color &&
                    this.product &&
                    (this.color = this.product.design.design_data.background);
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], Cart.prototype, "id");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, {
            cascade: true
        }),
        (0, typeorm_1.JoinColumn)({ name: 'client_id' })
    ], Cart.prototype, "owner");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return product_entity_1.Product; }, {
            cascade: true,
            eager: true
        }),
        (0, typeorm_1.JoinColumn)()
    ], Cart.prototype, "product");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return order_entity_1.Order; }, function (order) { return order.cart; })
    ], Cart.prototype, "orders");
    __decorate([
        (0, typeorm_1.Column)({
            type: 'integer',
            transformer: { to: function (value) { return Math.abs(value); }, from: function (value) { return value; } }
        })
    ], Cart.prototype, "quantity");
    __decorate([
        (0, typeorm_1.Column)({ type: 'integer' })
    ], Cart.prototype, "total");
    __decorate([
        (0, typeorm_1.Column)({ type: 'enum', "enum": size_1.Size, nullable: true, "default": size_1.Size.M })
    ], Cart.prototype, "size");
    __decorate([
        (0, typeorm_1.Column)({ type: 'enum', "enum": color_1.Color, nullable: true })
    ], Cart.prototype, "color");
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        (0, typeorm_1.BeforeUpdate)()
    ], Cart.prototype, "calculateTotal");
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        (0, typeorm_1.BeforeUpdate)()
    ], Cart.prototype, "addColor");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Cart.prototype, "created_at");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], Cart.prototype, "updated_at");
    Cart = __decorate([
        (0, typeorm_1.Entity)('cart_item')
    ], Cart);
    return Cart;
}(typeorm_1.BaseEntity));
exports.Cart = Cart;
