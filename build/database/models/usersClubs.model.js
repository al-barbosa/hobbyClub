"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const users_model_1 = __importDefault(require("./users.model"));
const clubs_model_1 = __importDefault(require("./clubs.model"));
class UsersClubs extends sequelize_1.Model {
}
UsersClubs.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
}, {
    underscored: true,
    sequelize: _1.default,
    modelName: 'usersClubs',
    timestamps: false,
});
/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */
users_model_1.default.belongsToMany(clubs_model_1.default, {
    through: UsersClubs,
    foreignKey: 'clubId',
    otherKey: 'userId',
    as: 'club',
});
clubs_model_1.default.belongsToMany(users_model_1.default, {
    through: UsersClubs,
    foreignKey: 'userId',
    otherKey: 'clubId',
    as: 'user',
});
exports.default = UsersClubs;
