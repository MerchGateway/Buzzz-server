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
exports.__esModule = true;
exports.DatabaseModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var ormconfig_1 = require("./ormconfig");
var DatabaseModule = /** @class */ (function () {
    function DatabaseModule() {
    }
    DatabaseModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forRootAsync({
                    imports: [],
                    inject: [],
                    useFactory: function () { return (__assign(__assign({}, ormconfig_1.AppDataSource.options), { autoLoadEntities: true })); }
                }),
            ]
        })
    ], DatabaseModule);
    return DatabaseModule;
}());
exports.DatabaseModule = DatabaseModule;
