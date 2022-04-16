'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    static associate(models) {
      this.belongsTo(models.User);
    }
  }
  Attendance.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      punchedAt: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Attendance',
      tableName: 'attendances',
      timestamps: false,
    },
  );

  return Attendance;
};
