"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContactModule = void 0;
var common_1 = require("@nestjs/common");
var contact_controller_1 = require("./contact.controller");
var contact_service_1 = require("./contact.service");
var contact_entity_1 = require("./entities/contact.entity");
var typeorm_1 = require("@nestjs/typeorm");
var constant_1 = require("../../constant");
var config_1 = require("@nestjs/config");
var nodemailer_provider_1 = require("../../providers/nodemailer.provider");
var ContactModule = /** @class */ (function () {
    function ContactModule() {
    }
    ContactModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([contact_entity_1.Contact])],
            controllers: [contact_controller_1.ContactController],
            providers: [
                contact_service_1.ContactService,
                {
                    provide: constant_1.EMAIL_PROVIDER,
                    useFactory: function (configService) {
                        return new nodemailer_provider_1.NodemailerProvider(configService);
                    },
                    inject: [config_1.ConfigService]
                },
            ],
            exports: [contact_service_1.ContactService]
        })
    ], ContactModule);
    return ContactModule;
}());
exports.ContactModule = ContactModule;
