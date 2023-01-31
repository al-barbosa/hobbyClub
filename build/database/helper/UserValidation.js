"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class UserValidation {
    constructor() {
        this.validateSignUp = (body) => {
            return joi_1.default.object({
                username: joi_1.default.string().required().min(4).messages({
                    'string.empty': `Username cannot be an empty field`,
                    'string.min': `Username should have a minimum length of {#limit}`,
                }),
                email: joi_1.default.string().required().min(6).email().messages({
                    'string.empty': `E-mail cannot be an empty field`,
                    'string.min': `E-mail should have a minimum length of {#limit}`,
                    'string.email': `Invalid e-mail`,
                }),
                password: joi_1.default.string().required().min(6).messages({
                    'string.empty': `Password cannot be an empty field`,
                    'string.min': `Password should have a minimum length of {#limit}`,
                }),
            }).validate(body);
        };
        this.validateLogIn = (body) => {
            return joi_1.default.object({
                email: joi_1.default.string().required().min(4).email().messages({
                    'string.empty': `E-mail cannot be an empty field`,
                    'string.min': `E-mail should have a minimum length of {#limit}`,
                    'string.email': `Invalid e-mail`,
                }),
                password: joi_1.default.string().required().min(6).messages({
                    'string.empty': `Password cannot be an empty field`,
                    'string.min': `Password should have a minimum length of {#limit}`,
                }),
            }).validate(body);
        };
    }
}
exports.default = UserValidation;
;
