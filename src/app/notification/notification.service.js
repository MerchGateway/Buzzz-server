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
exports.NotificationService = void 0;
var common_1 = require("@nestjs/common");
var user_entity_1 = require("../users/entities/user.entity");
var notification_entity_1 = require("./entities/notification.entity");
var typeorm_1 = require("@nestjs/typeorm");
var typeorm_2 = require("typeorm");
var notification_1 = require("../../types/notification");
var response_1 = require("../../utils/response");
var constant_1 = require("../../constant");
var NotificationService = /** @class */ (function () {
    function NotificationService(notificationRepository, userRepository, pushNotificationProvider) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.pushNotificationProvider = pushNotificationProvider;
    }
    NotificationService.prototype.fetchNotification = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.notificationRepository.find({
                                where: { user: { id: user.id } },
                                order: { created_at: 'DESC' }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_1 = _a.sent();
                        throw new common_1.HttpException(err_1.message, err_1.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NotificationService.prototype.getUserWithRegisterationToken = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var userWithToken, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { email: email },
                                select: ['id', 'registerationToken', 'allowNotification']
                            })];
                    case 1:
                        userWithToken = _a.sent();
                        if (!userWithToken) {
                            return [2 /*return*/];
                        }
                        return [2 /*return*/, userWithToken];
                    case 2:
                        err_2 = _a.sent();
                        throw new common_1.HttpException(err_2.message, err_2.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NotificationService.prototype.createNotification = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var isRegisteredToken, notification, savedNotifications, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getUserWithRegisterationToken(payload.email)];
                    case 1:
                        isRegisteredToken = _a.sent();
                        if (!isRegisteredToken) {
                            throw new common_1.NotFoundException("User  with provided email ".concat(payload.email, " not  found"));
                        }
                        notification = this.notificationRepository.create({
                            title: payload.title,
                            message: payload.message,
                            user: { id: isRegisteredToken.id }
                        });
                        return [4 /*yield*/, this.notificationRepository.save(notification)];
                    case 2:
                        savedNotifications = _a.sent();
                        console.log(notification);
                        if (isRegisteredToken && isRegisteredToken.allowNotification == true) {
                            // send push notification
                            this.pushNotificationProvider.sendPushNotification(isRegisteredToken.registerationToken, { title: payload.title, body: payload.message });
                        }
                        return [2 /*return*/, savedNotifications];
                    case 3:
                        err_3 = _a.sent();
                        throw new common_1.HttpException(err_3.message, err_3.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    NotificationService.prototype.createMultipleNotifications = function (payload, query) {
        return __awaiter(this, void 0, void 0, function () {
            var tokens_1, createNotificationBody_1, users, notifications, savedNotifications, err_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        tokens_1 = [];
                        createNotificationBody_1 = [];
                        return [4 /*yield*/, this.userRepository.find({
                                where: __assign(__assign({}, query), { allowNotification: true, registerationToken: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()) }),
                                select: ['registerationToken']
                            })];
                    case 1:
                        users = _a.sent();
                        // compute registeration token
                        return [4 /*yield*/, Promise.all(users.map(function (data) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    tokens_1.push(data.registerationToken);
                                    createNotificationBody_1.push({
                                        title: payload.title,
                                        message: payload.message,
                                        user: { id: data.id }
                                    });
                                    return [2 /*return*/];
                                });
                            }); }))];
                    case 2:
                        // compute registeration token
                        _a.sent();
                        notifications = this.notificationRepository.create(createNotificationBody_1);
                        return [4 /*yield*/, this.notificationRepository.save(notifications)];
                    case 3:
                        savedNotifications = _a.sent();
                        return [4 /*yield*/, this.pushNotificationProvider.sendManyPushNotification(tokens_1, {
                                title: payload.title,
                                body: payload.message
                            })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, savedNotifications];
                    case 5:
                        err_4 = _a.sent();
                        throw new common_1.HttpException(err_4.message, err_4.status);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    NotificationService.prototype.refreshRegisterationToken = function (user, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (user.allowNotification == false) {
                            throw new common_1.HttpException('Please turn on allow notification', common_1.HttpStatus.NOT_ACCEPTABLE);
                        }
                        return [4 /*yield*/, this.userRepository.save(__assign(__assign({}, user), { registerationToken: payload.registerationToken }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new response_1.SuccessResponse({}, 'Notification registeration token set successfully')];
                    case 2:
                        err_5 = _a.sent();
                        throw new common_1.HttpException(err_5.message, err_5.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NotificationService.prototype.turnOnNotification = function (user, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository.save(__assign(__assign({}, user), { registerationToken: payload.registerationToken, allowNotification: true }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new response_1.SuccessResponse({ allowNotification: true }, 'Notification turned on successfully')];
                    case 2:
                        err_6 = _a.sent();
                        throw new common_1.HttpException(err_6.message, err_6.status);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NotificationService.prototype.markNotificationAsRead = function (id, user) {
        return __awaiter(this, void 0, void 0, function () {
            var notification, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.notificationRepository.findOne({
                                where: { id: id, user: { id: user.id } }
                            })];
                    case 1:
                        notification = _a.sent();
                        if (!notification) {
                            throw new common_1.NotFoundException("Notification with id '".concat(id, "' does not exist"));
                        }
                        notification.status = notification_1.Status.READ;
                        return [4 /*yield*/, this.notificationRepository.save(notification)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_7 = _a.sent();
                        throw new common_1.HttpException(err_7.message, err_7.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    NotificationService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
        __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
        __param(2, (0, common_1.Inject)(constant_1.PUSH_NOTIFICATION))
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
