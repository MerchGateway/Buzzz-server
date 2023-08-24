"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ErrorsInterceptor = void 0;
var common_1 = require("@nestjs/common");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var axios_1 = require("axios");
var ErrorsInterceptor = /** @class */ (function () {
    function ErrorsInterceptor() {
    }
    ErrorsInterceptor.prototype.intercept = function (context, next) {
        return next.handle().pipe((0, operators_1.catchError)(function (err) {
            if (err.message === 'getaddrinfo ENOTFOUND api.paystack.co' ||
                err.message === 'getaddrinfo EAI_AGAIN api.paystack.co') {
                return (0, rxjs_1.throwError)(function () {
                    return new common_1.ServiceUnavailableException('Error connecting to Paystack, your connection might be down');
                });
            }
            else if (err instanceof axios_1.AxiosError) {
                return (0, rxjs_1.throwError)(function () { var _a; return new common_1.BadRequestException((_a = err.response) === null || _a === void 0 ? void 0 : _a.data.message); });
            }
            else if (err.message.includes('timeout')) {
                return (0, rxjs_1.throwError)(function () { return new common_1.RequestTimeoutException('Request timed out'); });
            }
            else if (err instanceof common_1.BadRequestException) {
                return (0, rxjs_1.throwError)(function () { return new common_1.BadRequestException(err); });
            }
            return (0, rxjs_1.throwError)(function () { return new common_1.BadGatewayException((err === null || err === void 0 ? void 0 : err.message) || err); });
        }));
    };
    ErrorsInterceptor = __decorate([
        (0, common_1.Injectable)()
    ], ErrorsInterceptor);
    return ErrorsInterceptor;
}());
exports.ErrorsInterceptor = ErrorsInterceptor;
