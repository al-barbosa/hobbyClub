import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Hobbies from './hobbies.model';
import Users from './users.model';
import UsersClubs from './usersClubs.model';

class Clubs extends Model {
  declare id: number;
  declare name: string;
  declare adminId: number;
  declare hobbyId: number;
}

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

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

Hobbies.belongsTo(Clubs, { foreignKey: 'clubId', as: 'club' });

Clubs.hasMany(Hobbies, { foreignKey: 'clubId', as: 'oldHobbies' });



Clubs.belongsToMany(Users, { through: UsersClubs });

export default Clubs;
