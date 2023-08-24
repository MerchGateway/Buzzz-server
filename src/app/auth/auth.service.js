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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var user_entity_1 = require("../../../../../../../../src/app/users/entities/user.entity");
var typeorm_2 = require("typeorm");
var response_1 = require("../../utils/response");
var password_reset_entity_1 = require("./entities/password-reset.entity");
var constant_1 = require("../../constant");
var authenticator_1 = require("../../../../../../../../src/types/authenticator");
var AuthService = /** @class */ (function () {
    function AuthService(jwtService, designService, userRepository, passwordResetRepository, logger, emailProvider, walletService, twoFactorAuthService) {
        this.jwtService = jwtService;
        this.designService = designService;
        this.userRepository = userRepository;
        this.passwordResetRepository = passwordResetRepository;
        this.logger = logger;
        this.emailProvider = emailProvider;
        this.walletService = walletService;
        this.twoFactorAuthService = twoFactorAuthService;
        this.logger.setContext(AuthService_1.name);
    }
    AuthService_1 = AuthService;
    AuthService.prototype.validateUser = function (email, enteredPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isMatch, password, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository
                            .createQueryBuilder('user')
                            .where('user.email = :email', { email: email })
                            .addSelect('user.password')
                            .getOne()];
                    case 1:
                        user = _a.sent();
                        console.log(user);
                        if (!user) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, user.matchPassword(enteredPassword)];
                    case 2:
                        isMatch = _a.sent();
                        console.log(isMatch);
                        if (!isMatch) {
                            return [2 /*return*/, null];
                        }
                        password = user.password, result = __rest(user, ["password"]);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    AuthService.prototype.findOauthUser = function (identityProvider, identityProviderId) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository
                            .createQueryBuilder('user')
                            .where('user.identityProvider = :identityProvider', { identityProvider: identityProvider })
                            .andWhere('user.identityProviderId = :identityProviderId', {
                            identityProviderId: identityProviderId
                        })
                            .getOne()];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    AuthService.prototype.postAdminSignin = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_a) {
                console.log('this is the user', user);
                payload = { sub: user.id, role: user.role };
                user.password && delete user.password;
                return [2 /*return*/, {
                        user: user,
                        accessToken: this.jwtService.sign(payload)
                    }];
            });
        });
    };
    AuthService.prototype.postSignin = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, wallet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        payload = { sub: user.id, role: user.role };
                        user.password && delete user.password;
                        if (!!user.wallet) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.walletService.createWallet()];
                    case 1:
                        wallet = _a.sent();
                        return [4 /*yield*/, this.userRepository.save(__assign(__assign({}, user), { wallet: wallet }))];
                    case 2:
                        user = _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, {
                            user: user,
                            accessToken: this.jwtService.sign(payload)
                        }];
                }
            });
        });
    };
    AuthService.prototype.signin = function (user, designId) {
        return __awaiter(this, void 0, void 0, function () {
            var data, design, updatedUserData, tokenLocation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.postSignin(user)];
                    case 1:
                        data = _a.sent();
                        if (!designId) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.designService.fetchSingleDesign(designId)];
                    case 2:
                        design = _a.sent();
                        design.owner = user;
                        return [4 /*yield*/, design.save()];
                    case 3:
                        _a.sent();
                        console.log(design);
                        _a.label = 4;
                    case 4:
                        if (!(user.allow2fa == true)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.userRepository.save(__assign(__assign({}, data.user), { isTwoFactorVerified: false }))];
                    case 5:
                        updatedUserData = _a.sent();
                        if (!(user.twoFactorType === authenticator_1.Authtype.INAPP)) return [3 /*break*/, 7];
                        // send  login token
                        return [4 /*yield*/, this.twoFactorAuthService.generateOtp(user)];
                    case 6:
                        // send  login token
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        tokenLocation = user.twoFactorType === authenticator_1.Authtype.GOOGLE
                            ? 'google authenticator app'
                            : 'registered email';
                        return [2 /*return*/, new response_1.SuccessResponse(__assign(__assign({}, updatedUserData), { accessToken: data.accessToken }), "Continue sign in by providing an authorization token from your ".concat(tokenLocation, " "))];
                    case 8: return [2 /*return*/, new response_1.SuccessResponse(data, 'Signin successful')];
                }
            });
        });
    };
    AuthService.prototype.signup = function (signupUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var user, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = this.userRepository.create(signupUserDto);
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.postSignin(user)];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, new response_1.SuccessResponse(data, 'Signup successful', common_1.HttpStatus.CREATED)];
                }
            });
        });
    };
    AuthService.prototype.forgotPassword = function (forgotPasswordDto) {
        return __awaiter(this, void 0, void 0, function () {
            var user, passwordResetToken, resetToken, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOneBy({
                            email: forgotPasswordDto.email
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException("User with email ".concat(forgotPasswordDto.email, " does no exist"));
                        }
                        return [4 /*yield*/, this.findOrCreatePasswordReset(user)];
                    case 2:
                        passwordResetToken = _a.sent();
                        resetToken = passwordResetToken.token;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.emailProvider.sendMail({
                                message: "Your password reset token is ".concat(resetToken),
                                to: forgotPasswordDto.email,
                                subject: 'Password Reset'
                            })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        this.logger.log("Error sending email: ".concat(error_1.message));
                        throw new common_1.HttpException('Unable to send email', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                    case 6: return [2 /*return*/, new response_1.SuccessResponse({}, 'Password reset email sent successfully')];
                }
            });
        });
    };
    AuthService.prototype.resetPassword = function (resetPasswordDto) {
        return __awaiter(this, void 0, void 0, function () {
            var passwordReset, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.passwordResetRepository.findOne({
                            where: {
                                token: resetPasswordDto.token,
                                createdAt: (0, typeorm_2.MoreThanOrEqual)(new Date(Date.now() - constant_1.PASSWORD_RESET_TOKEN_EXPIRY))
                            },
                            relations: { user: true }
                        })];
                    case 1:
                        passwordReset = _a.sent();
                        if (!passwordReset) {
                            throw new common_1.UnauthorizedException('Invalid token');
                        }
                        user = passwordReset.user;
                        user.password = resetPasswordDto.password;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.passwordResetRepository.remove(passwordReset)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, new response_1.SuccessResponse({}, 'Password reset successfully')];
                }
            });
        });
    };
    AuthService.prototype.findOrCreatePasswordReset = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var passwordReset, newPasswordReset;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.passwordResetRepository.findOne({
                            where: {
                                user: { id: user.id },
                                createdAt: (0, typeorm_2.MoreThanOrEqual)(new Date(Date.now() - constant_1.PASSWORD_RESET_TOKEN_EXPIRY))
                            }
                        })];
                    case 1:
                        passwordReset = _a.sent();
                        if (passwordReset) {
                            return [2 /*return*/, passwordReset];
                        }
                        newPasswordReset = this.passwordResetRepository.create({
                            user: user
                        });
                        return [2 /*return*/, this.passwordResetRepository.save(newPasswordReset)];
                }
            });
        });
    };
    AuthService.prototype.updatePassword = function (user, updatePasswordDto) {
        return __awaiter(this, void 0, void 0, function () {
            var isPasswordMatch, password, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository
                            .createQueryBuilder('user')
                            .where('user.id = :id', { id: user.id })
                            .addSelect('user.password')
                            .getOne()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, user.matchPassword(updatePasswordDto.oldPassword)];
                    case 2:
                        isPasswordMatch = _a.sent();
                        if (!isPasswordMatch) {
                            throw new common_1.UnauthorizedException('Invalid old password');
                        }
                        user.password = updatePasswordDto.password;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 3:
                        _a.sent();
                        password = user.password, result = __rest(user, ["password"]);
                        return [2 /*return*/, new response_1.SuccessResponse({ user: result }, 'Password updated successfully')];
                }
            });
        });
    };
    // admin section
    AuthService.prototype.adminSignin = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.postAdminSignin(user)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, new response_1.SuccessResponse(data, 'Signin successful')];
                }
            });
        });
    };
    var AuthService_1;
    AuthService = AuthService_1 = __decorate([
        (0, common_1.Injectable)(),
        __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
        __param(3, (0, typeorm_1.InjectRepository)(password_reset_entity_1.PasswordReset)),
        __param(5, (0, common_1.Inject)(constant_1.EMAIL_PROVIDER))
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
