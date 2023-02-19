"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class HobbyValidation {
    constructor() {
        this.validateNewHobby = (body) => {
            return joi_1.default.object({
                name: joi_1.default.string().required().min(4).messages({
                    'string.empty': `Hobby name cannot be an empty field`,
                    'string.min': `Hobby name should have a minimum length of {#limit}`,
                }),
                type: joi_1.default.string().required().messages({
                    'string.empty': `Type is required`,
                }),
                img: joi_1.default.string(),
            }).validate(body);
        };
    }
}
exports.default = HobbyValidation;
;
