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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const user_controllers_1 = __importDefault(require("../controllers/user.controllers"));
const TokenHelper_1 = __importDefault(require("../helper/TokenHelper"));
const userControllers = new user_controllers_1.default();
const tokenHandler = new TokenHelper_1.default();
const userRoute = express.Router();
userRoute.get('/', userControllers.getAll);
userRoute.get('/:id', tokenHandler.validateToken, userControllers.getUser);
userRoute.post('/:id/:club', tokenHandler.validateToken, userControllers.joinClub);
userRoute.post('/', userControllers.createUser);
userRoute.post('/login', userControllers.login);
exports.default = userRoute;
