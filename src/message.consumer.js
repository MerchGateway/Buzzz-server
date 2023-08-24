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
exports.MessageConsumer = void 0;
var constant_1 = require("./constant");
var bull_1 = require("@nestjs/bull");
var errors_1 = require("@nestjs/websockets/errors");
var typeorm_1 = require("@nestjs/typeorm");
var design_entity_1 = require("./app/design/entities/design.entity");
var common_1 = require("@nestjs/common");
var MessageConsumer = /** @class */ (function () {
    function MessageConsumer(designService, designRepository, imageStorage) {
        this.designService = designService;
        this.designRepository = designRepository;
        this.imageStorage = imageStorage;
    }
    MessageConsumer.prototype.readOperationJob = function (job) {
        return __awaiter(this, void 0, void 0, function () {
            var jobData, isDesignExist, _a, newDesign, updatedDesign, updatedDesign, err_1;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log("entered queue");
                        jobData = job.data;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 13, , 14]);
                        if (!jobData.id) return [3 /*break*/, 3];
                        _b = {};
                        return [4 /*yield*/, this.designService.fetchSingleDesign(jobData.id)];
                    case 2:
                        isDesignExist = (_b.design = _c.sent(),
                            _b);
                        if (jobData.user &&
                            isDesignExist.design &&
                            !isDesignExist.design.contributors.includes(jobData.user.email)) {
                            console.log('unauthorized to design');
                            throw new errors_1.WsException('You are not an authorized contributor');
                        }
                        return [3 /*break*/, 7];
                    case 3:
                        if (!jobData.user) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.designService.fetchLatestDesignForCurrentUser(jobData.user)];
                    case 4:
                        _a = _c.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        _a = { design: null };
                        _c.label = 6;
                    case 6:
                        isDesignExist = _a;
                        _c.label = 7;
                    case 7:
                        console.log(isDesignExist);
                        if (!!isDesignExist.design) return [3 /*break*/, 9];
                        console.log('creating new design');
                        newDesign = this.designRepository.create({
                            owner: jobData.user,
                            texts: [],
                            images: [],
                            contributors: []
                        });
                        return [4 /*yield*/, this.designService.sortAssets(newDesign, jobData.payload)];
                    case 8:
                        updatedDesign = _c.sent();
                        console.log('came back here', updatedDesign);
                        return [2 /*return*/, updatedDesign];
                    case 9:
                        console.log('updating old design');
                        isDesignExist.design.images = [];
                        isDesignExist.design.texts = [];
                        // delete old images from cloudinary
                        return [4 /*yield*/, this.imageStorage.deletePhotosByPrefix(isDesignExist.design.owner
                                ? isDesignExist.design.owner.username
                                : 'no_auth')];
                    case 10:
                        // delete old images from cloudinary
                        _c.sent();
                        return [4 /*yield*/, this.designService.sortAssets(isDesignExist.design, jobData.payload)];
                    case 11:
                        updatedDesign = _c.sent();
                        console.log(updatedDesign);
                        return [2 /*return*/, updatedDesign];
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        err_1 = _c.sent();
                        throw new errors_1.WsException(err_1.message);
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, bull_1.Process)(constant_1.DESIGN_MERCH)
    ], MessageConsumer.prototype, "readOperationJob");
    MessageConsumer = __decorate([
        (0, bull_1.Processor)(constant_1.EVENT_QUEUE),
        __param(1, (0, typeorm_1.InjectRepository)(design_entity_1.Design)),
        __param(2, (0, common_1.Inject)(constant_1.CLOUDINARY))
    ], MessageConsumer);
    return MessageConsumer;
}());
exports.MessageConsumer = MessageConsumer;
