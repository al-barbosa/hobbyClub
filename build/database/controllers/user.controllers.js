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
                const token = yield this.userService.login(req.body);
                return res.status(200).json({ token });
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
                const creeatedUserInfo = yield this.userService.createUser(req.body);
                const { username } = creeatedUserInfo;
                return res
                    .status(200)
                    .json({ message: `User ${username} was successfully created` });
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
