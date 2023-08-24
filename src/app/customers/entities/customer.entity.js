"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Customer = void 0;
var user_entity_1 = require("../../../../../../../../../src/app/users/entities/user.entity");
var status_1 = require("../../../../../../../../../src/types/status");
var typeorm_1 = require("typeorm");
var Customer = /** @class */ (function () {
    function Customer() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], Customer.prototype, "id");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ name: 'created_at' })
    ], Customer.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.Column)()
    ], Customer.prototype, "sellerId");
    __decorate([
        (0, typeorm_1.Column)({ type: 'enum', "enum": status_1.Status, "default": status_1.Status.ENABLED })
    ], Customer.prototype, "status");
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return user_entity_1.User; }),
        (0, typeorm_1.JoinTable)()
    ], Customer.prototype, "customer");
    Customer = __decorate([
        (0, typeorm_1.Entity)('customer')
    ], Customer);
    return Customer;
}());
exports.Customer = Customer;
