import { Sequelize, Model, INTEGER, STRING, BOOLEAN } from "sequelize";
import * as config from '../config/database'
import db from '.';

export default new Sequelize(config);

class Users extends Model {
  declare id: number;
  declare email: string;
  declare username: string;
  declare password: string;
}

class Clubs extends Model {
  declare id: number;
  declare name: string;
  declare adminId: number;
  declare hobbyId: number;
}

class Hobbies extends Model {
  declare id: number;
  declare name: string;
  declare type: string;
  declare finished: boolean;
}

class UsersClubs extends Model {
  declare id: number;
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: true,
});

Clubs.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  adminId: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'clubs',
  timestamps: true,
});

Hobbies.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  type: {
    type: STRING,
    allowNull: false,
  },
  finished: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'hobbies',
  timestamps: true,
});

UsersClubs.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'usersClubs',
  timestamps: false,
});

Clubs.belongsTo(Users, { foreignKey: 'adminId', as: 'admin' });

Users.hasMany(Clubs, { foreignKey: 'adminId', as: 'admin_of' });

Hobbies.belongsTo(Clubs, { foreignKey: 'clubId', as: 'club' });

Clubs.hasMany(Hobbies, { foreignKey: 'clubId', as: 'hobbies' });

Users.belongsToMany(Clubs, {
  through: UsersClubs,
  foreignKey: 'clubId',
  otherKey: 'userId',
  as: 'club',
});

Clubs.belongsToMany(Users, {
  through: UsersClubs,
  foreignKey: 'userId',
  otherKey: 'clubId',
  as: 'user',
});

Users.hasMany(UsersClubs);

UsersClubs.belongsTo(Users);

Clubs.hasMany(UsersClubs);

UsersClubs.belongsTo(Clubs);




export { Users, Clubs, Hobbies, UsersClubs }