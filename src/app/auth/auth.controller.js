"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var public_decorator_1 = require("../../decorators/public.decorator");
var user_decorator_1 = require("../../decorators/user.decorator");
var google_oauth_guard_1 = require("./guards/google-oauth.guard");
var local_auth_guard_1 = require("./guards/local-auth.guard");
var twitter_oauth_guard_1 = require("./guards/twitter-oauth.guard");
var twoFactor_jwt_auth_guard_1 = require("../2fa/guard/twoFactor-jwt-auth-guard");
var AuthController = /** @class */ (function () {
    function AuthController(authService, twoFactorAuthService) {
        this.authService = authService;
        this.twoFactorAuthService = twoFactorAuthService;
    }
    AuthController.prototype.signin = function (user, designId) {
        return this.authService.signin(user, designId);
    };
    AuthController.prototype.superAdminSignin = function (user) {
        return this.authService.adminSignin(user);
    };
    AuthController.prototype.signinWith2fa = function (user) {
        return this.twoFactorAuthService.signinWith2fa(user);
    };
    AuthController.prototype.googleOauthSignin = function () { };
    AuthController.prototype.googleOauthRedirect = function (user) {
        return this.authService.postSignin(user);
    };
    AuthController.prototype.twitterOauthSignin = function () { };
    AuthController.prototype.twitterOauthRedirect = function (user) {
        return this.authService.postSignin(user);
    };
    AuthController.prototype.signup = function (signupUserDto) {
        return this.authService.signup(signupUserDto);
    };
    AuthController.prototype.forgotPassword = function (forgotPasswordDto) {
        return this.authService.forgotPassword(forgotPasswordDto);
    };
    AuthController.prototype.resetPassword = function (resetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto);
    };
    AuthController.prototype.updatePassword = function (user, updatePasswordDto) {
        return this.authService.updatePassword(user, updatePasswordDto);
    };
    __decorate([
        (0, public_decorator_1.Public)(),
        (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
        (0, common_1.Post)('signin'),
        (0, common_1.HttpCode)(200),
        __param(0, (0, user_decorator_1.CurrentUser)()),
        __param(1, (0, common_1.Query)("designId"))
    ], AuthController.prototype, "signin");
    __decorate([
        (0, public_decorator_1.Public)(),
        (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
        (0, common_1.Post)('admin-signin'),
        (0, common_1.HttpCode)(200),
        __param(0, (0, user_decorator_1.CurrentUser)())
    ], AuthController.prototype, "superAdminSignin");
    __decorate([
        (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
        (0, common_1.UseGuards)(twoFactor_jwt_auth_guard_1.TwoFactorJwtAuthGuard),
        (0, common_1.Post)('2fa-signin'),
        __param(0, (0, user_decorator_1.CurrentUser)())
    ], AuthController.prototype, "signinWith2fa");
    __decorate([
        (0, public_decorator_1.Public)(),
        (0, common_1.UseGuards)(google_oauth_guard_1.GoogleOauthGuard),
        (0, common_1.Get)('/signin/google')
    ], AuthController.prototype, "googleOauthSignin");
    __decorate([
        (0, public_decorator_1.Public)(),
        (0, common_1.UseGuards)(google_oauth_guard_1.GoogleOauthGuard),
        (0, common_1.Get)('/signin/google/redirect'),
        __param(0, (0, user_decorator_1.CurrentUser)())
    ], AuthController.prototype, "googleOauthRedirect");
    __decorate([
        (0, public_decorator_1.Public)(),
        (0, common_1.UseGuards)(twitter_oauth_guard_1.TwitterOauthGuard),
        (0, common_1.Get)('/signin/twitter')
    ], AuthController.prototype, "twitterOauthSignin");
    __decorate([
        (0, public_decorator_1.Public)(),
        (0, common_1.UseGuards)(twitter_oauth_guard_1.TwitterOauthGuard),
        (0, common_1.Get)('/signin/twitter/redirect'),
        __param(0, (0, user_decorator_1.CurrentUser)())
    ], AuthController.prototype, "twitterOauthRedirect");
    __decorate([
        (0, public_decorator_1.Public)(),
        (0, common_1.Post)('signup'),
        __param(0, (0, common_1.Body)())
    ], AuthController.prototype, "signup");
    __decorate([
        (0, public_decorator_1.Public)(),
        (0, common_1.Post)('forgot-password'),
        __param(0, (0, common_1.Body)())
    ], AuthController.prototype, "forgotPassword");
    __decorate([
        (0, public_decorator_1.Public)(),
        (0, common_1.Post)('reset-password'),
        __param(0, (0, common_1.Body)())
    ], AuthController.prototype, "resetPassword");
    __decorate([
        (0, common_1.Patch)('update-password'),
        __param(0, (0, user_decorator_1.CurrentUser)()),
        __param(1, (0, common_1.Body)())
    ], AuthController.prototype, "updatePassword");
    AuthController = __decorate([
        (0, common_1.Controller)('auth')
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
