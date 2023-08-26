"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TwoFactorAuthModule = void 0;
var common_1 = require("@nestjs/common");
var twoFactorAuth_controller_1 = require("./twoFactorAuth.controller");
var twoFactorAuth_service_1 = require("./twoFactorAuth.service");
var typeorm_1 = require("@nestjs/typeorm");
var twoFactorAuth_entity_1 = require("./entities/twoFactorAuth.entity");
var user_entity_1 = require("../users/entities/user.entity");
var authenticator_provider_1 = require("../../providers/authenticator.provider");
var qrcode_provider_1 = require("../../providers/qrcode.provider");
var constant_1 = require("../../constant");
var constant_2 = require("../../constant");
var config_1 = require("@nestjs/config");
var nodemailer_provider_1 = require("../../providers/nodemailer.provider");
var twoFactor_jwt_strategy_1 = require("./guard/twoFactor-jwt-strategy");
var TwoFactorAuthModule = /** @class */ (function () {
    function TwoFactorAuthModule() {
    }
    TwoFactorAuthModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, twoFactorAuth_entity_1.TwoFactorAuth]),
            ],
            providers: [
                twoFactorAuth_service_1.TwoFactorAuthService,
                twoFactor_jwt_strategy_1.TwofactorJwtStrategy,
                {
                    provide: constant_1.AUTHENTICATOR,
                    useClass: authenticator_provider_1.Authenticator
                },
                {
                    provide: constant_1.QRCODE,
                    useClass: qrcode_provider_1.Qrcode
                },
                {
                    provide: constant_2.EMAIL_PROVIDER,
                    useFactory: function (configService) {
                        return new nodemailer_provider_1.NodemailerProvider(configService);
                    },
                    inject: [config_1.ConfigService]
                },
            ],
            controllers: [twoFactorAuth_controller_1.TwoFactorAuthController],
            exports: [twoFactorAuth_service_1.TwoFactorAuthService]
        })
    ], TwoFactorAuthModule);
    return TwoFactorAuthModule;
}());
exports.TwoFactorAuthModule = TwoFactorAuthModule;
