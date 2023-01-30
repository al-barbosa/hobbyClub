"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
// import OtherModel from './OtherModel';
class Hobbies extends sequelize_1.Model {
}
Hobbies.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    type: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    finished: {
        type: sequelize_1.BOOLEAN,
        allowNull: false,
    },
}, {
    underscored: true,
    sequelize: __1.default,
    modelName: 'hobbies',
    timestamps: true,
});
exports.default = Hobbies;
