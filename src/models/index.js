'use strict';

const POSTGRES_URI=process.env.POSTEGER_URI ||"postgres://localhost:5432/courses";

const { Sequelize, DataTypes } = require('sequelize')

const sequelize=new Sequelize(POSTGRES_URI,{});

let Student = require('./students');
let courses = require('./courses');


module.exports = {
    db: sequelize,
    students: Student(Sequelize, DataTypes),
    courses: courses(Sequelize, DataTypes)
}