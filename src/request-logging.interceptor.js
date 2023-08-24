"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RequestLoggingInterceptor = void 0;
var common_1 = require("@nestjs/common");
var nanoid_1 = require("nanoid");
var rxjs_1 = require("rxjs");
var RequestLoggingInterceptor = /** @class */ (function () {
    function RequestLoggingInterceptor(logger) {
        this.logger = logger;
        this.logger.setContext(RequestLoggingInterceptor_1.name);
    }
    RequestLoggingInterceptor_1 = RequestLoggingInterceptor;
    RequestLoggingInterceptor.prototype.intercept = function (context, next) {
        if (context.getType() === 'http') {
            // do something that is only important in the context of regular HTTP requests (REST)
            var req = context.switchToHttp().getRequest();
            return this.handleHTTPRequest(req, next);
        }
        else if (context.getType() === 'rpc') {
            // do something that is only important in the context of Microservice requests
        }
    };
    RequestLoggingInterceptor.prototype.handleHTTPRequest = function (req, next) {
        var _this = this;
        var now = Date.now();
        var method = req.method, url = req.url, body = req.body, ip = req.ip, query = req.query;
        var requestHash = (0, nanoid_1.nanoid)();
        this.logger.log("HTTP request ".concat(requestHash), {
            method: method,
            url: url,
            body: body,
            ip: ip,
            query: query
        });
        return next
            .handle()
            .pipe((0, rxjs_1.tap)(function () {
            return _this.logger.log("HTTP response ".concat(requestHash, " +").concat(Date.now() - now, "ms"), req.response);
        }));
    };
    var RequestLoggingInterceptor_1;
    RequestLoggingInterceptor = RequestLoggingInterceptor_1 = __decorate([
        (0, common_1.Injectable)()
    ], RequestLoggingInterceptor);
    return RequestLoggingInterceptor;
}());
exports.RequestLoggingInterceptor = RequestLoggingInterceptor;
