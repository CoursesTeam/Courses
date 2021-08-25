'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('../src/models/users');

const sequelize = new Sequelize('postgres://postgres@localhost:5432/courses');

const Users = userSchema(sequelize, DataTypes);

beforeAll(async () => {
    await sequelize.sync();
});

afterAll(async () => {
    await sequelize.drop();
});

describe('Bearer Auth', () => {
    let userInfo = {
        username: 'suad',
        password: '12345'
    }

    it('should create a user with a hashed password', async () => {
        // arrange

        // act
        let user = await Users.create(userInfo);
        
        let isValid = await bcrypt.compare(userInfo.password, user.password);

        // assert
        expect(user.id).toBeTruthy();
        //check user name and password
        expect(isValid).toBeTruthy();
    });

    it('should attach a teken on find', async () => {
        //arrange 

        //act
        let user = await Users.findOne({ username: userInfo.username});
        let decodedJwt = jwt.decode(user.token);

        // assert
        expect(user.username).toEqual(userInfo.username);
        expect(user.token).toBeTruthy();
        expect(decodedJwt.username).toEqual(userInfo.username);
    });
});