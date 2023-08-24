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
exports.TransactionController = void 0;
var common_1 = require("@nestjs/common");
var constant_1 = require("../../constant");
var common_2 = require("@nestjs/common");
var common_3 = require("@nestjs/common");
var roles_decorator_1 = require("../../../../../../../../src/decorators/roles.decorator");
var general_1 = require("../../../../../../../../src/types/general");
var roles_guard_1 = require("../auth/guards/roles.guard");
var user_decorator_1 = require("../../../../../../../../src/decorators/user.decorator");
var public_decorator_1 = require("../../../../../../../../src/decorators/public.decorator");
var TransactionController = /** @class */ (function () {
    function TransactionController(transactionService) {
        this.transactionService = transactionService;
    }
    TransactionController.prototype.verifyTransaction = function (reference, res) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transactionService.verifyTransaction(reference)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, res.render(response)];
                }
            });
        });
    };
    TransactionController.prototype.getAllTransactions = function (page, limit) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        limit = limit > 100 ? 100 : limit < 10 ? 10 : limit;
        return this.transactionService.getTransactions({
            page: page,
            limit: limit,
            route: "".concat(constant_1.BASE_URL, "/transaction/all")
        });
    };
    TransactionController.prototype.getTransactions = function (user, page, limit) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        limit = limit > 100 ? 100 : limit < 10 ? 10 : limit;
        return this.transactionService.getTransactionsForAuthUser(user, {
            page: page,
            limit: limit,
            route: "".concat(constant_1.BASE_URL, "/transaction")
        });
    };
    TransactionController.prototype.deleteTransaction = function (reference) {
        return this.transactionService.deleteTransaction(reference);
    };
    TransactionController.prototype.salesAnalytics = function (query) {
        return this.transactionService.salesAnalytics(query);
    };
    __decorate([
        (0, public_decorator_1.Public)(),
        (0, common_1.Get)('verify/'),
        (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
        __param(0, (0, common_1.Query)('reference')),
        __param(1, (0, common_1.Res)())
    ], TransactionController.prototype, "verifyTransaction");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
        (0, common_1.Get)('/all'),
        __param(0, (0, common_1.Query)('page', new common_3.DefaultValuePipe(1), common_2.ParseIntPipe)),
        __param(1, (0, common_1.Query)('limit', new common_3.DefaultValuePipe(10), common_2.ParseIntPipe))
    ], TransactionController.prototype, "getAllTransactions");
    __decorate([
        (0, common_1.Get)(''),
        __param(0, (0, user_decorator_1.CurrentUser)()),
        __param(1, (0, common_1.Query)('page', new common_3.DefaultValuePipe(1), common_2.ParseIntPipe)),
        __param(2, (0, common_1.Query)('limit', new common_3.DefaultValuePipe(10), common_2.ParseIntPipe))
    ], TransactionController.prototype, "getTransactions");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
        (0, common_1.Delete)(':reference'),
        __param(0, (0, common_1.Param)('reference'))
    ], TransactionController.prototype, "deleteTransaction");
    __decorate([
        (0, roles_decorator_1.Roles)(general_1.Role.SUPER_ADMIN),
        (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
        (0, common_1.Get)('/sales-analytics'),
        __param(0, (0, common_1.Query)('query'))
    ], TransactionController.prototype, "salesAnalytics");
    TransactionController = __decorate([
        (0, common_1.Controller)('transaction')
    ], TransactionController);
    return TransactionController;
}());
exports.TransactionController = TransactionController;
