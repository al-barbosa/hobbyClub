"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const clubs_model_1 = __importDefault(require("./clubs.model"));
const usersClubs_model_1 = __importDefault(require("./usersClubs.model"));
// import OtherModel from './OtherModel';
class Users extends sequelize_1.Model {
}
Users.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
}, {
    underscored: true,
    sequelize: _1.default,
    modelName: 'users',
    timestamps: true,
});
clubs_model_1.default.belongsTo(Users, { foreignKey: 'adminId', as: 'admin_of' });
Users.hasMany(clubs_model_1.default, { foreignKey: 'adminId', as: 'admin' });
Users.belongsToMany(clubs_model_1.default, { through: usersClubs_model_1.default });
exports.default = Users;
