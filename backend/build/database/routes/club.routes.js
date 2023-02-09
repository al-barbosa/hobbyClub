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
const club_controllers_1 = __importDefault(require("../controllers/club.controllers"));
const TokenHelper_1 = __importDefault(require("../helper/TokenHelper"));
const clubController = new club_controllers_1.default();
const clubRoute = express.Router();
const tokenHandler = new TokenHelper_1.default();
clubRoute.get('/', clubController.getAll);
clubRoute.post('/', tokenHandler.validateToken, clubController.createClub);
clubRoute.get('/:id', clubController.getClub);
clubRoute.get('/:id/messages', clubController.getMessages);
// clubRoute.post('/:id/messages', tokenHandler.validateToken, clubController.postMessage);
clubRoute.post('/:id/messages', clubController.postMessage);
clubRoute.post('/:id', tokenHandler.validateToken, clubController.createHobby);
clubRoute.patch('/:id/:hobby', tokenHandler.validateToken, clubController.finishHobby);
exports.default = clubRoute;
