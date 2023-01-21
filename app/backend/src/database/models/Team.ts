import { Model, DataTypes } from 'sequelize';

import sequelize from '.';

export default class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  tableName: 'teams',
  timestamps: false,
  underscored: true,
});
