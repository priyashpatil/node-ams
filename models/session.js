"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {}
  }
  Session.init(
    {
      sid: DataTypes.STRING,
      expires: DataTypes.DATE,
      data: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Session",
      tableName: "sessions",
    }
  );
  return Session;
};
