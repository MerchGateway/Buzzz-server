"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var auth_service_1 = require("./auth.service");
var auth_controller_1 = require("./auth.controller");
var users_module_1 = require("../users/users.module");
var typeorm_1 = require("@nestjs/typeorm");
var user_entity_1 = require("../users/entities/user.entity");
var passport_1 = require("@nestjs/passport");
var local_strategy_1 = require("./guards/local.strategy");
var jwt_1 = require("@nestjs/jwt");
var configuration_1 = require("../../config/configuration");
var jwt_strategy_1 = require("./guards/jwt.strategy");
var google_oauth_strategy_1 = require("./guards/google-oauth.strategy");
var twitter_oauth_strategy_1 = require("./guards/twitter-oauth.strategy");
var logger_module_1 = require("../../logger/logger.module");
var password_reset_entity_1 = require("./entities/password-reset.entity");
var constant_1 = require("../../constant");
var config_1 = require("@nestjs/config");
var nodemailer_provider_1 = require("../../providers/nodemailer.provider");
var wallet_module_1 = require("../wallet/wallet.module");
var admin_module_1 = require("../admin/admin.module");
var notification_module_1 = require("../notification/notification.module");
var twoFactorAuth_module_1 = require("../2fa/twoFactorAuth.module");
var design_module_1 = require("../design/design.module");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        (0, common_1.Module)({
            imports: [
                twoFactorAuth_module_1.TwoFactorAuthModule,
                design_module_1.DesignModule,
                passport_1.PassportModule,
                admin_module_1.AdminModule,
                jwt_1.JwtModule.register({
                    secret: (0, configuration_1["default"])().jwt.secret,
                    signOptions: { expiresIn: (0, configuration_1["default"])().jwt.expiresIn }
                }),
                users_module_1.UsersModule,
                notification_module_1.NotificationModule,
                typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, password_reset_entity_1.PasswordReset]),
                logger_module_1.LoggerModule,
                wallet_module_1.WalletModule,
            ],
            controllers: [auth_controller_1.AuthController],
            providers: [
                local_strategy_1.LocalStrategy,
                jwt_strategy_1.JwtStrategy,
                google_oauth_strategy_1.GoogleOauthStrategy,
                twitter_oauth_strategy_1.TwitterOauthStrategy,
                auth_service_1.AuthService,
                password_reset_entity_1.PasswordReset,
                {
                    provide: constant_1.EMAIL_PROVIDER,
                    useFactory: function (configService) {
                        return new nodemailer_provider_1.NodemailerProvider(configService);
                    },
                    inject: [config_1.ConfigService]
                },
            ],
            exports: [auth_service_1.AuthService]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
