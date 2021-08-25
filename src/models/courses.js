'use strict';

const courseModel = (sequelize, DataTypes) => sequelize.define('course', {
  
  title: { type: DataTypes.STRING, required: true },
  course_description: {  type: DataTypes.STRING }
});

module.exports = courseModel;