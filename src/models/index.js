'use strict';


const { Sequelize, DataTypes } = require('sequelize');

const courseModel = require('./courses');

const userSchema = require('./users');
const Collection = require('./data-collection');



const sequelize = new Sequelize('postgres://postgres@localhost:5432/courses');
const courses=courseModel(sequelize,DataTypes);

module.exports={
    db:sequelize,
    courses:new Collection(courses),
    users:userSchema(sequelize,DataTypes)

}


