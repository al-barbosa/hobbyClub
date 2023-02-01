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
const ClubValidation_1 = __importDefault(require("../helper/ClubValidation"));
const ErrorHelper_1 = __importDefault(require("../helper/ErrorHelper"));
const models_1 = require("../models");
class ClubService {
    constructor() {
        this.clubValidation = new ClubValidation_1.default();
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            const allClubs = yield models_1.Clubs.findAll({
                include: [{ model: models_1.Users, as: 'admin' },
                    { model: models_1.Hobbies, as: 'hobbies' },
                    { model: models_1.Users, as: 'user' }],
            });
            return allClubs;
        });
        this.getClub = (id) => __awaiter(this, void 0, void 0, function* () {
            const searchedClub = yield models_1.Clubs.findByPk(id, {
                include: [{ model: models_1.Users, as: 'admin' },
                    { model: models_1.Hobbies, as: 'hobbies' },
                    { model: models_1.Users, as: 'user' }],
            });
            if (!searchedClub)
                throw new ErrorHelper_1.default('Club not found', 404);
            return searchedClub;
        });
        this.createClub = (clubInfo) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const error = this.clubValidation.validateNewClub(clubInfo);
            if ((_a = error.error) === null || _a === void 0 ? void 0 : _a.message)
                throw new ErrorHelper_1.default((_b = error.error) === null || _b === void 0 ? void 0 : _b.message, 404);
            const { adminId, name } = clubInfo;
            console.log(clubInfo);
            const newClub = yield models_1.Clubs.create({ name, adminId }, {
                include: [{ model: models_1.Users, as: 'admin' },
                    { model: models_1.Hobbies, as: 'hobbies' },
                    { model: models_1.Users, as: 'user' }]
            });
            yield models_1.UsersClubs.create({ userId: adminId, clubId: newClub.id });
            console.log(newClub.id);
            return newClub;
        });
    }
}
exports.default = ClubService;
