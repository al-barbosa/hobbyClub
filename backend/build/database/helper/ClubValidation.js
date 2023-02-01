"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class ClubValidation {
    constructor() {
        this.validateNewClub = (body) => {
            return joi_1.default.object({
                name: joi_1.default.string().required().min(4).messages({
                    'string.empty': `Club name cannot be an empty field`,
                    'string.min': `Club name should have a minimum length of {#limit}`,
                }),
                adminId: joi_1.default.string().required().messages({
                    'string.empty': `Club needs an admin`,
                }),
            }).validate(body);
        };
    }
}
exports.default = ClubValidation;
;
