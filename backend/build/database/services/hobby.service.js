"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHelper_1 = __importDefault(require("../helper/ErrorHelper"));
const models_1 = require("../models");
// import { ValidationResult } from 'joi';
class HobbyService {
    constructor() {
        this.getHobby = (id) => __awaiter(this, void 0, void 0, function* () {
            const searchedClub = yield models_1.Hobbies.findByPk(id, { raw: true });
            if (!searchedClub)
                throw new ErrorHelper_1.default('Hobby not found', 404);
            const getMessages = yield models_1.HobbyMessages.findAll({ where: { hobby_id: id }, raw: true });
            searchedClub.messages = getMessages;
            console.log(getMessages);
            return searchedClub;
        });
    }
}
exports.default = HobbyService;
