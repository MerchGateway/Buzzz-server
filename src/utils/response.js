"use strict";
exports.__esModule = true;
exports.SuccessResponse = void 0;
var common_1 = require("@nestjs/common");
var SuccessResponse = /** @class */ (function () {
    function SuccessResponse(data, message, statusCode) {
        if (statusCode === void 0) { statusCode = common_1.HttpStatus.OK; }
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
    return SuccessResponse;
}());
exports.SuccessResponse = SuccessResponse;
