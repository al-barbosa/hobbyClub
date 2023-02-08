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
const hobby_controller_1 = __importDefault(require("../controllers/hobby.controller"));
const TokenHelper_1 = __importDefault(require("../helper/TokenHelper"));
const hobbyController = new hobby_controller_1.default();
const tokenHandler = new TokenHelper_1.default();
const hobbyRoute = express.Router();
// userRoute.get('/:id', tokenHandler.validateToken, HobbyController.getHobby);
hobbyRoute.get('/:id', hobbyController.getHobby);
hobbyRoute.post('/:id/:user', tokenHandler.validateToken, hobbyController.postMessage);
hobbyRoute.delete('/:messageId', tokenHandler.validateToken, hobbyController.deleteMessage);
exports.default = hobbyRoute;
