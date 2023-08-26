"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DesignModule = void 0;
var common_1 = require("@nestjs/common");
var message_consumer_1 = require("../../message.consumer");
var design_service_1 = require("./design.service");
var design_entity_1 = require("./entities/design.entity");
var cart_module_1 = require("../cart/cart.module");
var product_module_1 = require("../product/product.module");
var paystack_module_1 = require("../payment/paystack/paystack.module");
var typeorm_1 = require("@nestjs/typeorm");
var design_controller_1 = require("./design.controller");
var config_1 = require("@nestjs/config");
var app_gateway_1 = require("../../app.gateway");
var constant_1 = require("../../constant");
var jwt_provider_1 = require("../../providers/jwt.provider");
var cloudinary_provider_1 = require("../../providers/cloudinary.provider");
var jwt_1 = require("@nestjs/jwt");
var configuration_1 = require("../../config/configuration");
var users_module_1 = require("../users/users.module");
var polymailer_content_entity_1 = require("../order/entities/polymailer_content.entity");
var bull_1 = require("@nestjs/bull");
var redis_configuration_1 = require("../../config/redis-configuration");
var DesignModule = /** @class */ (function () {
    function DesignModule() {
    }
    DesignModule = __decorate([
        (0, common_1.Module)({
            imports: [
                bull_1.BullModule.forRoot({
                    redis: (0, redis_configuration_1.getRedisConfiguration)((0, configuration_1["default"])())
                }),
                bull_1.BullModule.registerQueue({
                    name: constant_1.EVENT_QUEUE
                }),
                users_module_1.UsersModule,
                typeorm_1.TypeOrmModule.forFeature([design_entity_1.Design, polymailer_content_entity_1.PolyMailerContent]),
                jwt_1.JwtModule.register({
                    secret: (0, configuration_1["default"])().jwt.secret,
                    signOptions: { expiresIn: (0, configuration_1["default"])().jwt.expiresIn }
                }),
                paystack_module_1.PaystackBrokerModule,
                product_module_1.ProductModule,
                cart_module_1.CartModule,
            ],
            providers: [
                design_service_1.DesignService,
                message_consumer_1.MessageConsumer,
                {
                    provide: constant_1.CLOUDINARY,
                    useFactory: function (configService) {
                        return new cloudinary_provider_1.CloudinaryProvider(configService);
                    },
                    inject: [config_1.ConfigService]
                },
                {
                    provide: constant_1.APP_GATEWAY,
                    useClass: app_gateway_1.AppGateway
                },
                {
                    provide: constant_1.JWT,
                    useClass: jwt_provider_1.Jwt
                },
            ],
            controllers: [design_controller_1.DesignController],
            exports: [design_service_1.DesignService]
        })
    ], DesignModule);
    return DesignModule;
}());
exports.DesignModule = DesignModule;
