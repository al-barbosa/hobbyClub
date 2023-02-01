"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const hobbies_model_1 = __importDefault(require("./hobbies.model"));
const users_model_1 = __importDefault(require("./users.model"));
const usersClubs_model_1 = __importDefault(require("./usersClubs.model"));
class Clubs extends sequelize_1.Model {
}
Clubs.init({
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
    adminId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
}, {
    underscored: true,
    sequelize: _1.default,
    modelName: 'clubs',
    timestamps: true,
});
/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */
hobbies_model_1.default.belongsTo(Clubs, { foreignKey: 'clubId', as: 'club' });
Clubs.hasMany(hobbies_model_1.default, { foreignKey: 'clubId', as: 'oldHobbies' });
Clubs.belongsToMany(users_model_1.default, { through: usersClubs_model_1.default });
exports.default = Clubs;
