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
const club_service_1 = __importDefault(require("../services/club.service"));
class ClubController {
    constructor() {
        this.clubService = new club_service_1.default();
        this.getAll = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            const allUsers = yield this.clubService.getAll();
            return res
                .status(200)
                .json(allUsers);
        });
        this.getClub = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const searchedClub = yield this.clubService.getClub(req.params.id);
                return res
                    .status(200)
                    .json(searchedClub);
            }
            catch (e) {
                const { code, message } = e;
                return res
                    .status(code)
                    .json({ message });
            }
            ;
        });
        this.createClub = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newClub = yield this.clubService.createClub(req.body);
                return res
                    .status(200)
                    .json(newClub);
            }
            catch (e) {
                const { code, message } = e;
                return res
                    .status(code)
                    .json({ message });
            }
            ;
        });
        this.createHobby = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newHobby = yield this.clubService.createHobbie(req.body, req.params.id);
                return res
                    .status(200)
                    .json(newHobby);
            }
            catch (e) {
                const { code, message } = e;
                return res
                    .status(code)
                    .json({ message });
            }
            ;
        });
        this.finishHobby = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.clubService.finishHobbie(req.params.id, req.params.hobby);
            return res
                .status(200)
                .json({ message: 'Hobby finished' });
        });
        this.getMessages = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const clubMessages = yield this.clubService.getMessages(req.params.id);
                return res
                    .status(200)
                    .json(clubMessages);
            }
            catch (e) {
                const { code, message } = e;
                return res
                    .status(code)
                    .json({ message });
            }
            ;
        });
        this.postMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.clubService.postMessage(req.params.id, req.body.userId, req.body.text);
                return res
                    .status(200)
                    .json({ message: 'Message posted' });
            }
            catch (e) {
                const { code, message } = e;
                return res
                    .status(code)
                    .json({ message });
            }
        });
    }
}
exports.default = ClubController;
