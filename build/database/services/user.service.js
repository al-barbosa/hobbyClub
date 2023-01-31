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
class UserService {
    constructor() {
        this.tokenHandler = new TokenHelper_1.default();
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            const allUsers = yield index_1.Users.findAll({
                include: { model: index_1.Clubs, as: 'club', include: ['hobbies'] },
            });
            return allUsers;
        });
        this.getUser = (id) => __awaiter(this, void 0, void 0, function* () {
            const searchedUser = yield index_1.Users.findByPk(id, {
                include: { model: index_1.Clubs, as: 'club', include: ['hobbies'] }
            });
            if (!searchedUser)
                throw new ErrorHelper_1.default('User not found', 404);
            return searchedUser;
        });
        this.login = (loginInfo) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = loginInfo;
            const userInfo = yield index_1.Users.findOne({ where: { email }, raw: true });
            if (!userInfo)
                throw new ErrorHelper_1.default('User not found', 404);
            const { password: hashedPassword } = userInfo;
            const checkHash = bcrypt.compareSync(password, hashedPassword);
            if (!checkHash)
                throw new ErrorHelper_1.default('Icorrect email or password', 404);
            const token = this.tokenHandler.createToken(loginInfo);
            return token;
        });
        this.createUser = (userInfo) => __awaiter(this, void 0, void 0, function* () {
            {
                const { email, password, username } = userInfo;
                const checkEmail = yield index_1.Users.findOne({ where: { email } });
                if (checkEmail)
                    throw new ErrorHelper_1.default('Email already registered', 404);
                var hashedPassword = bcrypt.hashSync(password, process.env.BCRYPT_SALT);
                const createdUser = yield index_1.Users.create({ email, password: hashedPassword, username });
                return createdUser;
            }
        });
    }
}
exports.default = UserService;
