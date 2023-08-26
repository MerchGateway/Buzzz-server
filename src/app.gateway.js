"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.AppGateway = void 0;
var websockets_1 = require("@nestjs/websockets");
var common_1 = require("@nestjs/common");
var socket_io_1 = require("socket.io");
var constant_1 = require("./constant");
var constant_2 = require("./constant");
var ExtendedSocket = /** @class */ (function (_super) {
    __extends(ExtendedSocket, _super);
    function ExtendedSocket() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ExtendedSocket;
}(socket_io_1.Socket));
var AppGateway = /** @class */ (function () {
    function AppGateway(designService, userService, jwtService) {
        this.designService = designService;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    // @UseGuards(WsGuard)
    AppGateway.prototype.handleDesign = function (client, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var tke, user, response, jwtRes, _a, _b, _c, _d, _e, _f, error_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        tke = client.handshake.headers.authorization
                            ? client.handshake.headers.authorization.split(' ')[1]
                            : null;
                        console.log('entered socket file');
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 10, , 11]);
                        if (!tke) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.jwtService.verifyToken(tke)];
                    case 2:
                        jwtRes = _g.sent();
                        return [4 /*yield*/, this.userService.findOne(jwtRes.sub)];
                    case 3:
                        user = _g.sent();
                        return [4 /*yield*/, this.designService.design(payload[0], user, payload[1] && payload[1])];
                    case 4:
                        response = _g.sent();
                        _b = (_a = this.server.to(user.id)).emit;
                        _c = [constant_1.DESIGN_MERCH];
                        return [4 /*yield*/, response.finished()];
                    case 5:
                        _b.apply(_a, _c.concat([_g.sent()]));
                        return [3 /*break*/, 9];
                    case 6: return [4 /*yield*/, this.designService.design(payload[0], null, client.handshake.query.id)];
                    case 7:
                        response = _g.sent();
                        _e = (_d = this.server.to(client.id)).emit;
                        _f = [constant_1.DESIGN_MERCH];
                        return [4 /*yield*/, response.finished()];
                    case 8:
                        _e.apply(_d, _f.concat([_g.sent()]));
                        _g.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        error_1 = _g.sent();
                        console.log('error from socket', error_1);
                        this.server
                            .to(client.id)
                            .emit(constant_1.DESIGN_ERROR, error_1.message ? error_1.message : 'Could not create or update design');
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    // @UseGuards(WsGuard)
    // @SubscribeMessage('contribute-to-design')
    // async contributeToDesign(
    //   client: ExtendedSocket,
    //   payload: any,
    // ): Promise<void> {
    //   // const user: User = client.user;
    //   const response = await this.jwtService.verifyToken(
    //     client.handshake.headers.authorization.split(' ')[1],
    //   );
    //   const user: User = await this.userService.findOne(response.sub);
    //   await this.designService.contributeToDesign(
    //     user,
    //     payload,
    //     client.handshake.query.id as string,
    //   );
    //   client.to(user.id).emit('contribute-to-design', payload);
    // }
    AppGateway.prototype.afterInit = function (server) {
        console.log('server initialized');
    };
    AppGateway.prototype.handleDisconnect = function (client) {
        console.log("Disconnected: ".concat(client.id));
    };
    AppGateway.prototype.handleConnection = function (client) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var tke, payload, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        tke = client.handshake.headers.authorization
                            ? client.handshake.headers.authorization.split(' ')[1]
                            : null;
                        if (!tke) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.jwtService.verifyToken(tke)];
                    case 1:
                        payload = _a.sent();
                        // join private room
                        client.join(payload === null || payload === void 0 ? void 0 : payload.sub);
                        console.log(client.rooms);
                        console.log("Connected ".concat(client.id));
                        this.server.to(payload.sub).emit(constant_1.SOCKET_CONNECT, { connected: true });
                        return [3 /*break*/, 3];
                    case 2:
                        this.server.to(client.id).emit(constant_1.SOCKET_CONNECT, { connected: true });
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        client.disconnect(true);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, websockets_1.WebSocketServer)()
    ], AppGateway.prototype, "server");
    __decorate([
        (0, websockets_1.SubscribeMessage)(constant_1.DESIGN_MERCH)
    ], AppGateway.prototype, "handleDesign");
    AppGateway = __decorate([
        (0, websockets_1.WebSocketGateway)({
            cors: {
                origin: '*'
            }
        }),
        __param(2, (0, common_1.Inject)(constant_2.JWT))
    ], AppGateway);
    return AppGateway;
}());
exports.AppGateway = AppGateway;
