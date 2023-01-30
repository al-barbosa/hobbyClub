import { Model, INTEGER, STRING, BOOLEAN } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Hobbies extends Model {
  declare id: number;
  declare name: string;
  declare type: string;
  declare finished: boolean;
}

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

export default Hobbies;
