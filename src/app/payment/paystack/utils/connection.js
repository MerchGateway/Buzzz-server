"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var configuration_1 = require("../../../../config/configuration");
var config = (0, configuration_1["default"])();
var connection = function () {
    return axios_1["default"].create({
        baseURL: 'https://api.paystack.co',
        // timeout: 2000,
        headers: {
            Authorization: "Bearer ".concat(config.paystack.secret)
        }
    });
};
exports["default"] = connection;
