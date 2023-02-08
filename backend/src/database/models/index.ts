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

class HobbyMessages extends Model {
  declare id: number;
  declare text: string;
  declare hobby_id: number;
  declare user_id: number;
}

class ClubMessages extends Model {
  declare id: number;
  declare text: string;
  declare club_id: number;
  declare user_id: number;
}

class UserMessages extends Model {
  declare id: number;
  declare text: string;
  declare sender_id: number;
  declare receiver_id: number;
  declare read: boolean;
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
  img: {
    type: INTEGER,
    allowNull: true,
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

UsersClubs.init({}, {
  underscored: true,
  sequelize: db,
  modelName: 'usersClubs',
  timestamps: false,
});

HobbyMessages.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: STRING,
    allowNull: false,
  },
  hobby_id: {
    type: INTEGER,
    allowNull: false,
  },
  user_id: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'hobbyMessages',
  timestamps: true,
});

ClubMessages.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: STRING,
    allowNull: false,
  },
  club_id: {
    type: INTEGER,
    allowNull: false,
  },
  user_id: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'clubMessages',
  timestamps: true,
});

UserMessages.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: STRING,
    allowNull: false,
  },
  sender_id: {
    type: INTEGER,
    allowNull: false,
  },
  receiver_id: {
    type: INTEGER,
    allowNull: false,
  },
  read: {
    type: BOOLEAN,
    allowNull: false,
  }
}, {
  underscored: true,
  sequelize: db,
  modelName: 'userMessages',
  timestamps: true,
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

Users.belongsToMany(Clubs, { through: UsersClubs, as: 'club' })
Clubs.belongsToMany(Users, { through: UsersClubs, as: 'user' })

// HobbyMessages.belongsTo(Hobbies, { foreignKey: 'hobby_id', as: 'hobby' })
HobbyMessages.belongsTo(Users, { foreignKey: 'user_id', as: 'user' })

ClubMessages.belongsTo(Users, { foreignKey: 'user_id', as: 'user' })

UserMessages.belongsTo(Users, { foreignKey: 'sender_id', as: 'sender' })
UserMessages.belongsTo(Users, { foreignKey: 'receiver_id', as: 'receiver' })



export { Users, Clubs, Hobbies, UsersClubs, HobbyMessages, UserMessages, ClubMessages }