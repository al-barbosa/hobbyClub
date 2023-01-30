import { Model, INTEGER } from 'sequelize';
import db from '.';
import Users from './users.model';
import Clubs from './clubs.model';

class UsersClubs extends Model {
  declare id: number;
}

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

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

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


export default UsersClubs;
