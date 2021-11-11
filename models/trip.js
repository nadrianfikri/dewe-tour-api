'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Trip.belongsTo(models.Country, {
        as: 'country',
        foreignKey: {
          name: 'country_id',
        },
      });

      Trip.hasMany(models.Transaction, {
        as: 'transactions',
        foreignKey: {
          name: 'trip_id',
        },
      });
    }
  }
  Trip.init(
    {
      title: DataTypes.STRING,
      country_id: DataTypes.INTEGER,
      accomodation: DataTypes.STRING,
      transportation: DataTypes.STRING,
      eat: DataTypes.STRING,
      day: DataTypes.INTEGER,
      night: DataTypes.INTEGER,
      dateTrip: DataTypes.DATE,
      price: DataTypes.INTEGER,
      quota: DataTypes.INTEGER,
      quotaFilled: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      images: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Trip',
    }
  );
  return Trip;
};
