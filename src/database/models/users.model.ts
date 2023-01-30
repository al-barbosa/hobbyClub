import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Clubs from './clubs.model';
import UsersClubs from './usersClubs.model';
// import OtherModel from './OtherModel';

class Users extends Model {
  declare id: number;
  declare email: string;
  declare username: string;
  declare password: string;
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

Clubs.belongsTo(Users, { foreignKey: 'adminId', as: 'admin_of' });

Users.hasMany(Clubs, { foreignKey: 'adminId', as: 'admin' });



Users.belongsToMany(Clubs, { through: UsersClubs });

export default Users;
