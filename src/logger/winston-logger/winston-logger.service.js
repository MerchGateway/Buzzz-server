"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.WinstonLoggerService = void 0;
var common_1 = require("@nestjs/common");
var winston_1 = require("winston");
var combine = winston_1.format.combine, timestamp = winston_1.format.timestamp, json = winston_1.format.json;
var logger = (0, winston_1.createLogger)({
    format: combine(timestamp(), json()),
    transports: [new winston_1.transports.Console()]
});
var WinstonLoggerService = /** @class */ (function () {
    function WinstonLoggerService() {
    }
    WinstonLoggerService.prototype.setContext = function (context) {
        this.context = context;
    };
    WinstonLoggerService.prototype.log = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        logger.info.apply(logger, __spreadArray(["[".concat(this.context, "] ").concat(message)], optionalParams, false));
    };
    WinstonLoggerService.prototype.error = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        logger.error.apply(logger, __spreadArray(["[".concat(this.context, "] ").concat(message)], optionalParams, false));
    };
    WinstonLoggerService.prototype.warn = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        logger.warn.apply(logger, __spreadArray(["[".concat(this.context, "] ").concat(message)], optionalParams, false));
    };
    WinstonLoggerService = __decorate([
        (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT })
    ], WinstonLoggerService);
    return WinstonLoggerService;
}());
exports.WinstonLoggerService = WinstonLoggerService;
