"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const index_1 = require("../models/index");
const bcrypt = __importStar(require("bcryptjs"));
const TokenHelper_1 = __importDefault(require("../helper/TokenHelper"));
const UserValidation_1 = __importDefault(require("../helper/UserValidation"));
class UserService {
    constructor() {
        this.tokenHandler = new TokenHelper_1.default();
        this.userValidaton = new UserValidation_1.default();
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            const allUsers = yield index_1.Users.findAll({
                include: { model: index_1.Clubs, as: 'club', include: ['hobbies'] },
                attributes: { exclude: ['password'] },
            });
            return allUsers;
        });
        this.getUser = (id) => __awaiter(this, void 0, void 0, function* () {
            const searchedUser = yield index_1.Users.findByPk(id, {
                include: { model: index_1.Clubs, as: 'club', include: ['hobbies'] },
                attributes: { exclude: ['password'] },
            });
            if (!searchedUser)
                throw new ErrorHelper_1.default('User not found', 404);
            return searchedUser;
        });
        this.login = (loginInfo) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const error = this.userValidaton.validateLogIn(loginInfo);
            if ((_a = error.error) === null || _a === void 0 ? void 0 : _a.message)
                throw new ErrorHelper_1.default((_b = error.error) === null || _b === void 0 ? void 0 : _b.message, 404);
            const { email, password } = loginInfo;
            const userInfo = yield index_1.Users.findOne({
                where: { email },
                raw: true
            });
            if (!userInfo)
                throw new ErrorHelper_1.default('User not found', 404);
            const { password: hashedPassword } = userInfo;
            const checkHash = bcrypt.compareSync(password, hashedPassword);
            if (!checkHash)
                throw new ErrorHelper_1.default('Incorrect email or password', 404);
            const { id, username } = userInfo;
            const token = this.tokenHandler.createToken(loginInfo);
            const answer = { email, id, username, token };
            return answer;
        });
        this.createUser = (userInfo) => __awaiter(this, void 0, void 0, function* () {
            var _c, _d;
            {
                const error = this.userValidaton.validateSignUp(userInfo);
                if ((_c = error.error) === null || _c === void 0 ? void 0 : _c.message)
                    throw new ErrorHelper_1.default((_d = error.error) === null || _d === void 0 ? void 0 : _d.message, 404);
                const { email, password, username } = userInfo;
                const checkEmail = yield index_1.Users.findOne({ where: { email } });
                if (checkEmail)
                    throw new ErrorHelper_1.default('Email already registered', 404);
                var hashedPassword = bcrypt.hashSync(password, process.env.BCRYPT_SALT);
                const nUser = yield index_1.Users.create({ email, password: hashedPassword, username }, { include: { model: index_1.Clubs, as: 'club', include: ['hobbies'] } });
                const { id } = nUser;
                const token = this.tokenHandler.createToken({ email, password });
                const createdUser = { email, password, username, id, token };
                return createdUser;
            }
        });
        this.joinClub = (userId, clubId) => __awaiter(this, void 0, void 0, function* () {
            const checkUserClub = yield index_1.UsersClubs.findOne({ where: { userId, clubId } });
            // if (checkUserClub) throw new ErrorHandler('User already joined club', 404);
            yield index_1.UsersClubs.create({ userId, clubId });
        });
        this.leftClub = (userId, clubId) => __awaiter(this, void 0, void 0, function* () {
            const checkUserClub = yield index_1.UsersClubs.findOne({ where: { userId, clubId } });
            // if (checkUserClub) throw new ErrorHandler('User did not joined club', 404);
            console.log('check');
            yield index_1.UsersClubs.destroy({ where: { userId, clubId } });
        });
        this.getMessages = (userId) => __awaiter(this, void 0, void 0, function* () {
            const messages = yield index_1.UserMessages.findAll({ where: { receiver_id: userId } });
            return messages;
        });
    }
}
exports.default = UserService;
