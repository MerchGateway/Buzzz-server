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
exports.Order = void 0;
var product_entity_1 = require("../../product/product.entity");
var transaction_entity_1 = require("../../transaction/entities/transaction.entity");
var typeorm_1 = require("typeorm");
var order_1 = require("../../../types/order");
var cart_entity_1 = require("../../cart/entities/cart.entity");
var user_entity_1 = require("../../users/entities/user.entity");
var printing_partner_entity_1 = require("../../admin/printing-partners/entities/printing-partner.entity");
var logistics_partner_entity_1 = require("../../admin/logistics-partners/entities/logistics-partner.entity");
var Order = /** @class */ (function (_super) {
    __extends(Order, _super);
    function Order() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Order.prototype.setDeliveryFee = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Order.prototype.updateProductDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.cart) {
                    this.product = this.cart.product;
                    this.quantity = this.cart.quantity;
                    this.total = this.cart.total;
                }
                return [2 /*return*/];
            });
        });
    };
    Order.prototype.shippingFee = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Order.prototype.addCoupon = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.coupon = value;
                return [2 /*return*/];
            });
        });
    };
    Order.prototype.updateStatus = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.status = value;
                if (this.status === order_1.Status.PAID) {
                    // delete this.cart;
                    if (this.cart) {
                        cart_entity_1.Cart.remove(this.cart);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], Order.prototype, "id");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, {
            cascade: true,
            eager: true
        }),
        (0, typeorm_1.JoinColumn)({ name: 'client_id' })
    ], Order.prototype, "user");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return transaction_entity_1.Transaction; }, function (transaction) { return transaction.orders; }, {
            onDelete: 'CASCADE'
        }),
        (0, typeorm_1.JoinColumn)({ name: 'transaction_id' })
    ], Order.prototype, "transaction");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return cart_entity_1.Cart; }, function (cart) { return cart.orders; }, {
            eager: true,
            onDelete: 'SET NULL'
        }),
        (0, typeorm_1.JoinColumn)({ name: 'cart_item_id' })
    ], Order.prototype, "cart");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return product_entity_1.Product; }, {
            eager: true,
            onDelete: 'SET NULL'
        })
    ], Order.prototype, "product");
    __decorate([
        (0, typeorm_1.Column)()
    ], Order.prototype, "sellerId");
    __decorate([
        (0, typeorm_1.Column)({ type: 'numeric', nullable: true })
    ], Order.prototype, "quantity");
    __decorate([
        (0, typeorm_1.Column)({ type: 'numeric', nullable: true })
    ], Order.prototype, "total");
    __decorate([
        (0, typeorm_1.Column)({ type: 'simple-json', "default": null, nullable: true })
    ], Order.prototype, "shipping_details");
    __decorate([
        (0, typeorm_1.Column)({ type: 'simple-json', "default": null, nullable: true })
    ], Order.prototype, "polymailer_details");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, "default": 0, type: 'decimal', precision: 10 })
    ], Order.prototype, "delivery_fee");
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', "default": '', nullable: true })
    ], Order.prototype, "coupon");
    __decorate([
        (0, typeorm_1.Column)({ type: 'enum', "enum": order_1.Status, "default": order_1.Status.PENDING })
    ], Order.prototype, "status");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return printing_partner_entity_1.PrintingPartner; }, function (partner) { return partner.orders; }, {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        })
    ], Order.prototype, "printing_partner");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return logistics_partner_entity_1.LogisticsPartner; }, function (logistics) { return logistics.orders; }, {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        })
    ], Order.prototype, "logistics_partner");
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        (0, typeorm_1.BeforeUpdate)()
    ], Order.prototype, "setDeliveryFee");
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        (0, typeorm_1.BeforeUpdate)()
    ], Order.prototype, "updateProductDetails");
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        (0, typeorm_1.BeforeUpdate)()
    ], Order.prototype, "shippingFee");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Order.prototype, "created_at");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], Order.prototype, "updated_at");
    Order = __decorate([
        (0, typeorm_1.Entity)('order')
    ], Order);
    return Order;
}(typeorm_1.BaseEntity));
exports.Order = Order;
