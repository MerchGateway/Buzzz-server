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
exports.User = void 0;
var bcrypt = require("bcrypt");
var general_1 = require("../../../types/general");
var authenticator_1 = require("../../../types/authenticator");
var design_entity_1 = require("../../design/entities/design.entity");
var typeorm_1 = require("typeorm");
var logistics_partner_entity_1 = require("../../admin/logistics-partners/entities/logistics-partner.entity");
var printing_partner_entity_1 = require("../../admin/printing-partners/entities/printing-partner.entity");
var product_entity_1 = require("../../product/product.entity");
// import { UsernameGenerator } from 'src/providers/usernameGenerator.provider';
// import { USERNAME_GENERATOR } from 'src/constant';
var unique_username_generator_1 = require("unique-username-generator");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.prototype.hashPassword = function () {
        return __awaiter(this, void 0, void 0, function () {
            var salt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.password) return [3 /*break*/, 2];
                        return [4 /*yield*/, bcrypt.genSalt(10)];
                    case 1:
                        salt = _a.sent();
                        this.password = bcrypt.hashSync(this.password, salt);
                        console.log(this.password);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.setUsername = function () {
        // ensure username is generated only once as long as it is already set
        if (!this.username) {
            var username = (0, unique_username_generator_1.generateFromEmail)(this.email, 3);
            this.username = username;
            console.log(this.username);
        }
    };
    User.prototype.matchPassword = function (enteredPassword) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt.compare(enteredPassword, this.password)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], User.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({
            name: 'identity_provider',
            nullable: true,
            select: false
        })
    ], User.prototype, "identityProvider");
    __decorate([
        (0, typeorm_1.Column)({
            name: 'identity_provider_id',
            unique: true,
            nullable: true,
            select: false
        })
    ], User.prototype, "identityProviderId");
    __decorate([
        (0, typeorm_1.Column)({ unique: true })
    ], User.prototype, "email");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], User.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)({ select: false, nullable: true })
    ], User.prototype, "password");
    __decorate([
        (0, typeorm_1.Column)({ type: 'enum', "enum": general_1.Role, "default": general_1.Role.USER })
    ], User.prototype, "role");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], User.prototype, "bio");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], User.prototype, "phoneNumber");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], User.prototype, "address");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, type: 'simple-json' })
    ], User.prototype, "shipping_address");
    __decorate([
        (0, typeorm_1.Column)({ name: 'is_public', "default": true })
    ], User.prototype, "isPublic");
    __decorate([
        (0, typeorm_1.Column)({ name: 'notification', "default": false })
    ], User.prototype, "allowNotification");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return printing_partner_entity_1.PrintingPartner; }, function (printingPartner) { return printingPartner.administrators; }, { onDelete: 'SET NULL' }),
        (0, typeorm_1.JoinColumn)({ name: 'printing_partner' })
    ], User.prototype, "printing_partner");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return logistics_partner_entity_1.LogisticsPartner; }, function (logisticsPartner) { return logisticsPartner.administrators; }, { onDelete: 'SET NULL' }),
        (0, typeorm_1.JoinColumn)({ name: 'logistics_partner' })
    ], User.prototype, "logistics_partner");
    __decorate([
        (0, typeorm_1.Column)({
            name: 'registeration-token',
            type: 'varchar',
            nullable: true,
            unique: true,
            select: false
        })
    ], User.prototype, "registerationToken");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return design_entity_1.Design; }, function (design) { return design.owner; })
    ], User.prototype, "designs");
    __decorate([
        (0, typeorm_1.Column)({
            name: 'allow_twofactor_authentication',
            type: 'bool',
            "default": false
        })
    ], User.prototype, "allow2fa");
    __decorate([
        (0, typeorm_1.Column)({ name: 'is_twofactor_verified', type: 'bool', "default": false })
    ], User.prototype, "isTwoFactorVerified");
    __decorate([
        (0, typeorm_1.Column)({
            name: 'two_factor_type',
            type: 'enum',
            "enum": authenticator_1.Authtype,
            "default": authenticator_1.Authtype.GOOGLE
        })
    ], User.prototype, "twoFactorType");
    __decorate([
        (0, typeorm_1.Column)({ name: 'show_email', type: 'bool', "default": true })
    ], User.prototype, "showEmail");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], User.prototype, "instagram");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, unique: true })
    ], User.prototype, "username");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], User.prototype, "facebook");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], User.prototype, "twitter");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], User.prototype, "reddit");
    __decorate([
        (0, typeorm_1.JoinColumn)({ name: 'wallet_id' })
    ], User.prototype, "wallet");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return product_entity_1.Product; }, function (product) { return product.seller; })
    ], User.prototype, "products");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ name: 'created_at' })
    ], User.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' })
    ], User.prototype, "updatedAt");
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        (0, typeorm_1.BeforeUpdate)()
    ], User.prototype, "hashPassword");
    __decorate([
        (0, typeorm_1.BeforeUpdate)(),
        (0, typeorm_1.BeforeInsert)()
    ], User.prototype, "setUsername");
    User = __decorate([
        (0, typeorm_1.Entity)()
    ], User);
    return User;
}(typeorm_1.BaseEntity));
exports.User = User;
