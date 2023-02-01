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
exports.UsersClubs = exports.Hobbies = exports.Clubs = exports.Users = void 0;
const sequelize_1 = require("sequelize");
const config = __importStar(require("../config/database"));
const _1 = __importDefault(require("."));
exports.default = new sequelize_1.Sequelize(config);
class Users extends sequelize_1.Model {
}
exports.Users = Users;
class Clubs extends sequelize_1.Model {
}
exports.Clubs = Clubs;
class Hobbies extends sequelize_1.Model {
}
exports.Hobbies = Hobbies;
class UsersClubs extends sequelize_1.Model {
}
exports.UsersClubs = UsersClubs;
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
    sequelize: _1.default,
    modelName: 'hobbies',
    timestamps: true,
});
UsersClubs.init({}, {
    underscored: true,
    sequelize: _1.default,
    modelName: 'usersClubs',
    timestamps: false,
});
Clubs.belongsTo(Users, { foreignKey: 'adminId', as: 'admin' });
Users.hasMany(Clubs, { foreignKey: 'adminId', as: 'admin_of' });
Hobbies.belongsTo(Clubs, { foreignKey: 'clubId', as: 'club' });
Clubs.hasMany(Hobbies, { foreignKey: 'clubId', as: 'hobbies' });
// Users.belongsToMany(Clubs, {
//   through: UsersClubs,
//   foreignKey: 'clubId',
//   otherKey: 'userId',
//   as: 'club',
// });
// Clubs.belongsToMany(Users, {
//   through: UsersClubs,
//   foreignKey: 'userId',
//   otherKey: 'clubId',
//   as: 'user',
// });
// Users.hasMany(UsersClubs);
// UsersClubs.belongsTo(Users);
// Clubs.hasMany(UsersClubs);
// UsersClubs.belongsTo(Clubs);
Users.belongsToMany(Clubs, { through: UsersClubs, as: 'club' });
Clubs.belongsToMany(Users, { through: UsersClubs, as: 'user' });
