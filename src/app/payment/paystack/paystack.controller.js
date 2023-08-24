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
exports.PaystackBrokerController = void 0;
var common_1 = require("@nestjs/common");
// import { CreatePayRefDto, PaymentReceiptDto } from '../dto/create-pay-ref-dto';
var paystack_service_1 = require("./paystack.service");
var product_service_1 = require("../../product/product.service");
// import { PaymentReceipt } from '../entities/payment.entity';
var user_decorator_1 = require("../../../decorators/user.decorator");
// import { UpdateUserDto } from 'src/app/users/dto/update-user.dto';
//TODO: link payment with transactionentity
var PaystackBrokerController = /** @class */ (function () {
    function PaystackBrokerController(paystackService, productService) {
        this.paystackService = paystackService;
        this.productService = productService;
    }
    PaystackBrokerController.prototype.createPayRef = function (user) {
        return this.paystackService.createPayRef(user);
    };
    // @Get('verify-payment/:reference')
    // public verifyPayment(@Param('reference') reference: string) {
    //   return this.paystackService.verifyPayment(reference);
    // }
    PaystackBrokerController.prototype.createRefund = function (transaction) {
        return this.paystackService.createRefund(transaction);
    };
    // @Post('add-payment-record')
    // public async addPayRecord(
    //   @Body() body: PaymentReceiptDto,
    // ): Promise<PaymentReceipt> {
    //   await this.productService.handleGetAProduct(body.productId);
    //   const savedRecord = await this.paystackService.addPayRecord(body);
    //   // update the product as "paid"
    //   await this.productService.handleUpdatePaymentRecord(
    //     savedRecord.id,
    //     body.productId,
    //   );
    //   return savedRecord;
    // }
    PaystackBrokerController.prototype.removePayRecord = function (recordId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.paystackService.handleRemovePaymentRecord(recordId)];
            });
        });
    };
    PaystackBrokerController.prototype.getARecord = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.paystackService.handleGetARecord(id)];
            });
        });
    };
    __decorate([
        (0, common_1.Get)('create-payment-ref'),
        __param(0, (0, user_decorator_1.CurrentUser)())
    ], PaystackBrokerController.prototype, "createPayRef");
    __decorate([
        (0, common_1.Post)('create-refund'),
        __param(0, (0, common_1.Body)('transaction'))
    ], PaystackBrokerController.prototype, "createRefund");
    __decorate([
        (0, common_1.Delete)('remove-payment-record/:recordId'),
        __param(0, (0, common_1.Param)('recordId'))
    ], PaystackBrokerController.prototype, "removePayRecord");
    __decorate([
        (0, common_1.Get)('record/:id'),
        __param(0, (0, common_1.Param)('id'))
    ], PaystackBrokerController.prototype, "getARecord");
    PaystackBrokerController = __decorate([
        (0, common_1.Controller)('payment/paystack'),
        __param(0, (0, common_1.Inject)(paystack_service_1.PaystackBrokerService)),
        __param(1, (0, common_1.Inject)(product_service_1.ProductService))
    ], PaystackBrokerController);
    return PaystackBrokerController;
}());
exports.PaystackBrokerController = PaystackBrokerController;
