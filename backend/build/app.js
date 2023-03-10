"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./database/routes/user.routes"));
const club_routes_1 = __importDefault(require("./database/routes/club.routes"));
const hobby_routes_1 = __importDefault(require("./database/routes/hobby.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/user', user_routes_1.default);
app.use('/club', club_routes_1.default);
app.use('/hobby', hobby_routes_1.default);
exports.default = app;
