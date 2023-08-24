"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.TwoFactorAuthService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var twoFactorAuth_entity_1 = require("./entities/twoFactorAuth.entity");
var user_entity_1 = require("../users/entities/user.entity");
var constant_1 = require("../../../../../../../../src/constant");
var constant_2 = require("../../constant");
var response_1 = require("../../../../../../../../src/utils/response");
var authenticator_1 = require("../../../../../../../../src/types/authenticator");
var TwoFactorAuthService = /** @class */ (function () {
    function TwoFactorAuthService(twoFactorAuthRepository, userRepository, authenticator, qrcode, emailProvider) {
        this.twoFactorAuthRepository = twoFactorAuthRepository;
        this.userRepository = userRepository;
        this.authenticator = authenticator;
        this.qrcode = qrcode;
        this.emailProvider = emailProvider;
    }
    TwoFactorAuthService.prototype.toggle2fa = function (payload, user) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedUser, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!(payload.allow2fa == false)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userRepository.save(__assign(__assign({}, user), { isTwoFactorVerified: false, allow2fa: false }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new response_1.SuccessResponse({}, 'two factor authentication turned off successfully', 200)];
                    case 2:
                        console.log(user);
                        return [4 /*yield*/, this.userRepository.save(__assign(__assign({}, user), { isTwoFactorVerified: false, allow2fa: true }))];
                    case 3:
                        updatedUser = _a.sent();
                        console.log('passed here');
                        return [4 /*yield*/, this.initialize2fa(updatedUser)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        err_1 = _a.sent();
                        throw new common_1.HttpException(err_1.message, err_1.status);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TwoFactorAuthService.prototype.generateOtp = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var twoFaSecret, token, twoFactorAuthData, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.authenticator.generateTwoFactorAuthenticationSecret(user)];
                    case 1:
                        twoFaSecret = _a.sent();
                        token = this.authenticator.generate(twoFaSecret.secret);
                        twoFactorAuthData = new twoFactorAuth_entity_1.TwoFactorAuth();
                        twoFactorAuthData.user = user;
                        twoFactorAuthData.secret = twoFaSecret.secret;
                        // const twoFactorAuthData = this.twoFactorAuthRepository.create({
                        //   user,
                        //   secret: twoFaSecret.secret,
                        // });
                        return [4 /*yield*/, this.twoFactorAuthRepository.save(twoFactorAuthData)];
                    case 2:
                        // const twoFactorAuthData = this.twoFactorAuthRepository.create({
                        //   user,
                        //   secret: twoFaSecret.secret,
                        // });
                        _a.sent();
                        // send otp to email
                        return [4 /*yield*/, this.emailProvider.sendMail({
                                message: "Your OTP  is ".concat(token),
                                to: user.email,
                                subject: 'Login OTP'
                            })];
                    case 3:
                        // send otp to email
                        _a.sent();
                        return [2 /*return*/, new response_1.SuccessResponse({}, 'OTP sent to registered email', common_1.HttpStatus.CREATED)];
                    case 4:
                        err_2 = _a.sent();
                        throw new common_1.HttpException(err_2.message, err_2.status);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TwoFactorAuthService.prototype.generateQrCode = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var twoFaSecret, qrcodeDataUrl, generatedQrData, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.authenticator.generateTwoFactorAuthenticationSecret(user)];
                    case 1:
                        twoFaSecret = _a.sent();
                        return [4 /*yield*/, this.qrcode.generateQrCodeDataURL(twoFaSecret.otpauthUrl)];
                    case 2:
                        qrcodeDataUrl = _a.sent();
                        generatedQrData = this.twoFactorAuthRepository.create({
                            user: user,
                            secret: twoFaSecret.secret
                        });
                        return [4 /*yield*/, this.twoFactorAuthRepository.save(generatedQrData)];
                    case 3:
                        _a.sent();
                        //  return a qrcode image url to client (png)
                        return [2 /*return*/, { qrcode: qrcodeDataUrl }];
                    case 4:
                        err_3 = _a.sent();
                        throw new common_1.HttpException(err_3.message, err_3.status);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TwoFactorAuthService.prototype.initialize2fa = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!(user.allow2fa == false)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userRepository.save(__assign(__assign({}, user), { allow2fa: true, isTwoFactorVerified: false }))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        console.log("passed init save");
                        if (user.twoFactorType === authenticator_1.Authtype.GOOGLE) {
                            return [2 /*return*/, this.generateQrCode(user)];
                        }
                        return [2 /*return*/, this.generateOtp(user)];
                    case 3:
                        err_4 = _a.sent();
                        throw new common_1.HttpException(err_4.message, err_4.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TwoFactorAuthService.prototype.verify2faToken = function (token, user) {
        return __awaiter(this, void 0, void 0, function () {
            var isToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.twoFactorAuthRepository.findOneOrFail({
                            where: { user: { id: user.id } },
                            relations: ['user'],
                            select: ['id', 'secret']
                        })];
                    case 1:
                        isToken = _a.sent();
                        return [2 /*return*/, this.authenticator.verifyTwoFactorToken(token, isToken.secret)];
                }
            });
        });
    };
    TwoFactorAuthService.prototype.signinWith2fa = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new response_1.SuccessResponse(user, 'Signin successful')];
            });
        });
    };
    TwoFactorAuthService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(twoFactorAuth_entity_1.TwoFactorAuth)),
        __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
        __param(2, (0, common_1.Inject)(constant_1.AUTHENTICATOR)),
        __param(3, (0, common_1.Inject)(constant_1.QRCODE)),
        __param(4, (0, common_1.Inject)(constant_2.EMAIL_PROVIDER))
    ], TwoFactorAuthService);
    return TwoFactorAuthService;
}());
exports.TwoFactorAuthService = TwoFactorAuthService;
