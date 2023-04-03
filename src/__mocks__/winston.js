"use strict";
exports.__esModule = true;
exports.transports = exports.format = exports.createLogger = exports.logger = void 0;
exports.logger = {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn()
};
exports.createLogger = jest.fn();
exports.createLogger.mockImplementation(function () { return exports.logger; });
exports.format = {
    combine: jest.fn(),
    timestamp: jest.fn(),
    label: jest.fn(),
    json: jest.fn()
};
var Console = /** @class */ (function () {
    function Console() {
    }
    return Console;
}());
exports.transports = {
    Console: Console
};
