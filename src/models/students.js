'use strict';

const studentModel = (sequelize, DataTypes) => sequelize.define('student', {
  
  name: { type: DataTypes.STRING, required: true },
  age: {  type: DataTypes.STRING },
  major: {  type: DataTypes.STRING }
});

module.exports = studentModel;