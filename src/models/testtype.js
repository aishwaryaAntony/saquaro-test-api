'use strict';

module.exports = (sequelize, DataTypes) => {
  const TestType = sequelize.define('TestType',{
    code:{
      type: DataTypes.STRING,
      allowNull: false
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    description :{
      type: DataTypes.TEXT,
      allowNull: true
    },
    display_name :{
      type: DataTypes.STRING,
      allowNull: true
    },
    status:{
      type: DataTypes.STRING,
      allowNull: false
    },
  },{});
	TestType.associate = function (models) {
		// associations can be defined here
		TestType.hasMany(models.LocationTestType, { as: 'testTypes', foreignKey: 'test_type_id', sourceKey: 'id' });
	};
  return TestType;
};