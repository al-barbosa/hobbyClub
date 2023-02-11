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
const user_service_1 = __importDefault(require("../services/user.service"));
class UserController {
    constructor() {
        this.userService = new user_service_1.default();
        this.getAll = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            const allUsers = yield this.userService.getAll();
            return res
                .status(200)
                .json(allUsers);
        });
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const searchedUser = yield this.userService.getUser(req.params.id);
                return res.status(200).json(searchedUser);
            }
            catch (e) {
                const { code, message } = e;
                return res
                    .status(code)
                    .json({ message });
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const loggedUser = yield this.userService.login(req.body);
                return res.status(200).json(loggedUser);
            }
            catch (e) {
                const { code, message } = e;
                return res
                    .status(code)
                    .json({ message });
            }
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const createdUser = yield this.userService.createUser(req.body);
                return res
                    .status(200)
                    .json(createdUser);
            }
            catch (e) {
                const { code, message } = e;
                return res
                    .status(code)
                    .json({ message });
            }
        });
        this.joinClub = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userService.joinClub(req.params.id, req.params.club);
                return res
                    .status(200)
                    .json({ message: `User ${req.params.id} joined club ${req.params.club}` });
            }
            catch (e) {
                const { code, message } = e;
                return res
                    .status(code)
                    .json({ message });
            }
        });
        this.leftClub = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userService.leftClub(req.params.id, req.params.club);
                return res
                    .status(200)
                    .json({ message: `User ${req.params.id} has left club ${req.params.club}` });
            }
            catch (e) {
                const { code, message } = e;
                return res
                    .status(code)
                    .json({ message });
            }
        });
        this.getMessages = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield this.userService.getMessages(req.params.id);
                return res
                    .status(200)
                    .json(messages);
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
exports.default = UserController;
