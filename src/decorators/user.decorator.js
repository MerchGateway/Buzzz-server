"use strict";
exports.__esModule = true;
exports.CurrentUser = void 0;
var common_1 = require("@nestjs/common");
// Decorator to access the payload from a validated access token.
// It should be used only in the arguments for methods in your presentation layer.
exports.CurrentUser = (0, common_1.createParamDecorator)(function (data, context) {
    var req = context.switchToHttp().getRequest();
    return req.user;
});
