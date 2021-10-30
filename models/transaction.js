'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.User, {
        as: 'user',
        foreignKey: {
          name: 'user_id',
        },
      });

      Transaction.belongsTo(models.Trip, {
        as: 'trip',
        foreignKey: {
          name: 'trip_id',
        },
      });
    }
  }
  Transaction.init(
    {
      qty: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      status: DataTypes.STRING,
      attachment: DataTypes.STRING,
      trip_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Transaction',
    }
  );
  return Transaction;
};
