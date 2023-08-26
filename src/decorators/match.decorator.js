"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MatchConstraint = exports.Match = void 0;
var class_validator_1 = require("class-validator");
var Match = function (type, property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: MatchConstraint
        });
    };
};
exports.Match = Match;
var MatchConstraint = /** @class */ (function () {
    function MatchConstraint() {
    }
    MatchConstraint.prototype.validate = function (value, args) {
        var fn = args.constraints[0];
        return fn(args.object) === value;
    };
    MatchConstraint.prototype.defaultMessage = function (args) {
        var constraintProperty = args.constraints[0];
        return "".concat(constraintProperty, " and ").concat(args.property, " does not match");
    };
    MatchConstraint = __decorate([
        (0, class_validator_1.ValidatorConstraint)({ name: 'Match' })
    ], MatchConstraint);
    return MatchConstraint;
}());
exports.MatchConstraint = MatchConstraint;
