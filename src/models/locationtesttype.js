'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const LocationTestType = sequelize.define('LocationTestType',{
    test_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    location_test_type_ref:{
      type: DataTypes.STRING,
      allowNull: true
    },
    description :{
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    is_paid_type: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    is_insurance_test:{
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    acuity_ref :{
      type: DataTypes.STRING,
      allowNull: true
    },
    qr_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rank_order: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    display_name:{
      type: DataTypes.STRING,
      allowNull: true
    }
  },{});
  LocationTestType.associate = function (models) {
    // associations can be defined here
    LocationTestType.belongsTo(models.Location, { as: 'location', foreignKey: 'location_id', targetKey: 'id' });
    LocationTestType.belongsTo(models.TestType, { as: 'testType', foreignKey: 'test_type_id', targetKey: 'id' });
  };
  return LocationTestType;
};