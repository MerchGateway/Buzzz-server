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
exports.UsersController = void 0;
var common_1 = require("@nestjs/common");
var public_decorator_1 = require("../../decorators/public.decorator");
var user_decorator_1 = require("../../decorators/user.decorator");
var UsersController = /** @class */ (function () {
    function UsersController(usersService) {
        this.usersService = usersService;
    }
    UsersController.prototype.create = function (createUserDto) {
        return this.usersService.create(createUserDto);
    };
    UsersController.prototype.findAll = function (query) {
        console.log(query);
        return this.usersService.findAll(query);
    };
    UsersController.prototype.findOne = function (id) {
        return this.usersService.findOne(id);
    };
    UsersController.prototype.update = function (user, updateUserDto) {
        return this.usersService.update(user, updateUserDto);
    };
    UsersController.prototype.remove = function (id) {
        return this.usersService.remove(id);
    };
    __decorate([
        (0, public_decorator_1.Public)(),
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)())
    ], UsersController.prototype, "create");
    __decorate([
        (0, common_1.Get)(),
        __param(0, (0, common_1.Query)())
    ], UsersController.prototype, "findAll");
    __decorate([
        (0, public_decorator_1.Public)(),
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], UsersController.prototype, "findOne");
    __decorate([
        (0, common_1.Patch)(''),
        __param(0, (0, user_decorator_1.CurrentUser)()),
        __param(1, (0, common_1.Body)())
    ], UsersController.prototype, "update");
    __decorate([
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], UsersController.prototype, "remove");
    UsersController = __decorate([
        (0, common_1.Controller)('users')
    ], UsersController);
    return UsersController;
}());
exports.UsersController = UsersController;
