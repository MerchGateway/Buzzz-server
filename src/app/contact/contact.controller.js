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
exports.__esModule = true;
exports.ContactController = void 0;
var common_1 = require("@nestjs/common");
var public_decorator_1 = require("../../decorators/public.decorator");
var ContactController = /** @class */ (function () {
    function ContactController(contactService) {
        this.contactService = contactService;
    }
    ContactController.prototype.sendMessage = function (payload) {
        return this.contactService.sendMessage(payload);
    };
    ContactController.prototype.getAllmessages = function () {
        return this.contactService.getAllMessages();
    };
    __decorate([
        (0, public_decorator_1.Public)(),
        (0, common_1.Post)(''),
        (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
        __param(0, (0, common_1.Body)())
    ], ContactController.prototype, "sendMessage");
    __decorate([
        (0, public_decorator_1.Public)(),
        (0, common_1.Get)('')
    ], ContactController.prototype, "getAllmessages");
    ContactController = __decorate([
        (0, common_1.Controller)('contact-us')
    ], ContactController);
    return ContactController;
}());
exports.ContactController = ContactController;
